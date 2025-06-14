// App.jsx
import { useEffect } from 'react'
import { useUIStore } from './store/uiStore'

import StartScreen from './screens/StartScreen'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import DesktopScreen from './screens/DesktopScreen'

export default function App() {
  const { screen, setScreen } = useUIStore()

  // Ensure Zustand loads correct screen on mount (e.g. when refreshing)
  useEffect(() => {
    const savedScreen = localStorage.getItem('macos-screen')
    if (savedScreen) {
      setScreen(savedScreen)
    }
  }, [setScreen])

  return (
    <>
      {screen === 'start' && (
        <StartScreen
          onStart={() => {
            setScreen('loading')
            localStorage.setItem('macos-screen', 'loading')
          }}
        />
      )}

      {screen === 'loading' && (
        <LoadingScreen
          onLoaded={() => {
            setScreen('login')
            localStorage.setItem('macos-screen', 'login')
          }}
        />
      )}

      {screen === 'login' && (
        <LoginScreen
          onLoginSuccess={() => {
            setScreen('desktop')
            localStorage.setItem('macos-screen', 'desktop')
          }}
        />
      )}

      {screen === 'desktop' && <DesktopScreen />}
    </>
  )
}
