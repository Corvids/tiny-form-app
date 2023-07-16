import { IMessageBarStyles, IButtonStyles } from '@fluentui/react'

export const messageBarStyles: Partial<IMessageBarStyles> = {
  root: { width: '250px' },
}

export const buttonStyles: IButtonStyles = {
  root: {
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