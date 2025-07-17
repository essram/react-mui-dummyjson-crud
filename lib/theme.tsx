import { createTheme } from '@mui/material/styles'
import '@fontsource/poppins'

const theme = createTheme({

  palette: {
    mode: 'light', 
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f5f5f5', 
    },
    background: {
      default: '#f9f9f9', 
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', 
    },
    body2 : {
      fontSize: '1rem',
    }
  },
  shape: {
    borderRadius: 12, 
  },
  
})

export default theme
