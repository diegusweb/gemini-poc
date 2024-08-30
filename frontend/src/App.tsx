import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeModeEnum } from './types'
import { darkTheme, lightTheme } from './theme'

function App() {
  const [count, setCount] = useState(0)
  const themeMode = ThemeModeEnum.LIGHT;

  return (

    
    <ThemeProvider theme={themeMode === ThemeModeEnum.LIGHT ? lightTheme : darkTheme}>
      <CssBaseline />
      <Counter />
    </ThemeProvider>
     
   
  )
}

export default App
