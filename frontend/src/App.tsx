import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeModeEnum } from './types'
import { darkTheme, lightTheme } from './theme'
import { useAppSelector } from './store'
import { TestComponent } from './TestComponent'

function App() {
  const { themeMode } = useAppSelector((state) => state.ui);

  return (
    <ThemeProvider theme={themeMode === ThemeModeEnum.LIGHT ? lightTheme : darkTheme}>
      <CssBaseline />
      <TestComponent />
    </ThemeProvider>
  );
}

export default App
