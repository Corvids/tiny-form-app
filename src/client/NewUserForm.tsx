import React, { useState } from 'react'
import { DefaultButton, Stack, TextField, MessageBar, MessageBarType } from '@fluentui/react'
import { User } from '../server/userModels'
import { containerStyles, submitFormButtonStyles } from './NewUserFormStyles'
import { v4 as uuidv4 } from 'uuid'

export const NewUserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  })
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { name } = e.currentTarget
    setUser((prevUser: User) => ({ ...prevUser, [name]: newValue || '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newUser: User = {
        ...user,
        id: generateUniqueId() // Generate a unique ID for the user
      }

      const response = await fetch('http://localhost:8000/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })

      if (response.ok) {
        const createdUser: User = await response.json()
        console.log(`New user created :: ${JSON.stringify(createdUser)}`)
        setUser({
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: ''
        })
        setSuccessMessage('User created successfully.')
      } else {
        console.error(`Could not create new user, returned ${response.status} with message ${response.statusText}`)
      }
    } catch (error) {
      console.error(`Error when attempting to create new user :: ${error}`)
    }
  }

  const generateUniqueId = (): string => {
    return uuidv4()
  }

  return (
    <form onSubmit={handleSubmit} className={containerStyles}>
      <h3>User Form</h3>
      <Stack tokens={{ childrenGap: 10 }}>
        <TextField
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <DefaultButton text="Submit" type="submit" styles={submitFormButtonStyles} />
        {successMessage && (
          <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
            {successMessage}
          </MessageBar>
        )}
      </Stack>
    </form>
  )
}

export default NewUserForm
