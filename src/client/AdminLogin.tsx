import React, { useState } from 'react'
import { PrimaryButton, TextField, Stack, MessageBar, MessageBarType } from '@fluentui/react'
import { buttonStyles, containerStyles, messageBarStyles, textFieldStyles } from './AdminLoginStyles'

interface IAdminLoginScreenProps {
  onLogin: (username: string, password: string) => void
}

// TODO: persist the login
export const AdminLoginScreen: React.FC<IAdminLoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState<MessageBarType>(MessageBarType.error)

  const handleLogin = () => {
    // TODO: read username and password from .env file
    const adminUsername = 'superuser'
    const adminPassword = 'secretpassword'

    if (username === adminUsername && password === adminPassword) {
      setErrorMessage('')
      onLogin(username, password)
    } else {
      if (username !== adminUsername && password !== adminPassword) {
        setErrorMessage('Username and password are incorrect.')
      } else if (username !== adminUsername) {
        setErrorMessage('Username is incorrect.')
      } else if (password !== adminPassword) {
        setErrorMessage('Password is incorrect.')
      }
      setErrorType(MessageBarType.error)
    }
  }


  return (
    <Stack
      verticalAlign="start"
      horizontalAlign="start"
      tokens={{ childrenGap: 10 }}
      style={{ height: '100vh', padding: '20px' }}
    >
      <h3>Log in as Admin to View all Users</h3>
      <TextField
        label="Username"
        value={username}
        onChange={(e, newValue) => setUsername(newValue || '')}
        styles={textFieldStyles}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e, newValue) => setPassword(newValue || '')}
        styles={textFieldStyles}
      />
      {errorMessage && (
        <MessageBar messageBarType={errorType} styles={messageBarStyles}>
          {errorMessage}
        </MessageBar>
      )}
      <PrimaryButton text="Login" onClick={handleLogin} styles={buttonStyles} />
    </Stack>
  )
}
