import { IButtonStyles, mergeStyles } from "@fluentui/react"

export const containerStyles = mergeStyles({
  paddingTop: '20px',
  maxWidth: '400px'
})

export const submitFormButtonStyles: IButtonStyles = {
  root: {
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: '#B5838D',
    color: '#ffffff',
    fontWeight: 'bold',
    selectors: {
      ':hover': {
        backgroundColor: '#00B5AD',
      },
      ':focus': {
        outline: 'none',
        boxShadow: '0 0 4px #00B5AD',
      },
    },
  },
}
