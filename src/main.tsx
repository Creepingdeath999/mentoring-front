import { Global } from '@mantine/core'
import { render } from 'react-dom'
import App from './App'
import { ContextProvider } from './common/providers/ContextProvider'
import './index.css'
render(
  <ContextProvider>
    <App />
  </ContextProvider>,

  document.getElementById('main')
)
