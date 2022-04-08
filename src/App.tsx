import {
  MantineProvider,
  Paper,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { BrowserRouter } from 'react-router-dom'
import Layout from './core/pages/Layout'
export default () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  })

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
