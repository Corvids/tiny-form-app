import { IMessageBarStyles, IButtonStyles, IStackStyles, ITextFieldStyles } from '@fluentui/react'

export const containerStyles: IStackStyles = {
  root: {
    height: '100vh',
    justifyContent: 'left',
    marginTop: '50px',
    paddingLeft: '0'
  }
}

export const textFieldStyles: Partial<ITextFieldStyles> = {
  root: {
    field: { textAlign: 'left', width: '250px' }
  }
}

export const messageBarStyles: Partial<IMessageBarStyles> = {
  root: { width: '250px' },
}

export const buttonStyles: IButtonStyles = {
  root: {
    marginTop: '30px',
    backgroundColor: '#B5838D',
    selectors: {
      ':hover': {
        backgroundColor: 'red',
      },
      ':focus': {
        outline: 'none',
        boxShadow: '0 0 4px #00B5AD',
      },
    }
  },
}
