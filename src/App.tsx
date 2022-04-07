import {
  MantineProvider,
  Paper,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useHttp } from './common/hooks'
import { ToggleTheme } from './common/providers'
import { ApplicationContext } from './common/providers/ContextProvider'
import { Login, Registration } from './core/auth'
import Layout from './core/pages/Layout'
import Welcome from './core/pages/Welcome'
export default () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  })
  const tokenState = useContext(ApplicationContext)?.token
  if (!tokenState) return null
  const { token, setToken } = tokenState
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    useHttp('https://jsonplaceholder.typicode.com/todos/1', {}, console.log)
  }, [])
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <BrowserRouter>
      <ColorSchemeProvider
        toggleColorScheme={toggleColorScheme}
        colorScheme={colorScheme}
      >
        <MantineProvider
          withGlobalStyles
          theme={{ colorScheme, fontFamily: 'inherit' }}
        >
          <Paper
            radius={0}
            style={{ minHeight: '100vh', padding: 0, overflow: 'hidden' }}
          >
            <Layout />
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </BrowserRouter>
  )
}
