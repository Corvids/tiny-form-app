import { createTheme } from '@fluentui/react'

// Import the Roboto font
import 'typeface-roboto'

// Create a Fluent UI theme with Roboto font
const theme = createTheme({
  defaultFontStyle: {
    fontFamily: 'Roboto, sans-serif',
    color: '#333'
  },
})

export default theme
