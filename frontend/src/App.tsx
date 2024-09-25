import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeModeEnum } from './types'
import { darkTheme, lightTheme } from './theme'
import { useAppSelector } from './store'
import { Login } from './pages/Login/login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound/NotFound'
import { SingUp } from './pages/SingUp/SingUP'
import Profile from './pages/Profile/Profile'

function App() {
  const { themeMode } = useAppSelector((state) => state.ui);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    // <ThemeProvider theme={themeMode === ThemeModeEnum.DARK ? darkTheme : lightTheme}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SingUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
