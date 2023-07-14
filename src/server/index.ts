import express, { Application, Response, Request } from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { User } from './userModels'

interface Config {
  publicUrl: string
  port: string | number
  allUsersDir: string
}

const config: Config = {
  publicUrl: process.env.PUBLIC_URL || '',
  port: process.env.PORT || 8000,
  allUsersDir: path.join(__dirname, './users.json')
}

const API_VERSION = '/v1'

class Server_V1 {
  private app: Application
  private config: Config
  private users: User[]

  constructor(config: Config) {
    this.app = express()
    this.config = config
    this.users = this.loadUsers()

    this.configureMiddlewares()
    this.configureRoutes()
  }

  private configureMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(
      this.config.publicUrl,
      express.static(path.resolve(__dirname, '../../build'), { maxAge: Infinity })
    )
  }

  private configureRoutes() {
    const versionedUsersEndpoint = `${API_VERSION}/users`

    this.app.get(versionedUsersEndpoint, this.getUsers)
    this.app.get(`${versionedUsersEndpoint}/:id`, this.getUserById)
    this.app.post(versionedUsersEndpoint, this.createUser)
    this.app.delete(`${versionedUsersEndpoint}/:id`, this.deleteUser)
    this.app.get('/health', this.healthCheck)
    this.app.get('*', this.serveIndexHtml)
  }

  // GET all users
  private getUsers = (_: Request, res: Response) => {
    res.json(this.users)
  }

  // GET user by id
  private getUserById = (req: Request, res: Response) => {
    const userId = req.params.id
    const user = this.users.find((user) => user.id === userId)

    if (!user) {
      res.status(404).json({ message: `User with ${userId} not found` })
    } else {
      res.json(user)
    }
  }

  // POST a new user
  private createUser = (req: Request, res: Response) => {
    const newUser: User = req.body
    this.users.push(newUser)
    this.saveUsers()
    res.status(201).json(newUser)
  }

  // DELETE a user by id
  private deleteUser = (req: Request, res: Response) => {
    const userId = req.params.id
    const index = this.users.findIndex((user) => user.id === userId)

    if (index === -1) {
      res.status(404).json({ message: `User with ${userId} not found` })
    } else {
      const deletedUser = this.users.splice(index, 1)[0]
      this.saveUsers()
      res.json(deletedUser)
    }
  }

  // helper function to load users
  private loadUsers(): User[] {
    try {
      const data = fs.readFileSync(this.config.allUsersDir, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      throw new Error(`Could not read users from ${this.config.allUsersDir} :: ${error}`)
    }
  }

  // helper function to save to users json file
  private saveUsers(): void {
    fs.writeFileSync(this.config.allUsersDir, JSON.stringify(this.users))
  }

  // for testing
  private healthCheck = (_: Request, res: Response) => {
    res.status(200).send('Everything is okay 🤘')
  }

  private serveIndexHtml = (_: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'))
  }

  public start(): void {
    this.app.listen(this.config.port, () => {
      console.log(`Server is running on http://localhost:${this.config.port}`)
    })
  }
}

const server = new Server_V1(config)
server.start()

export default server
