import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  useMantineTheme,
  Center,
} from '@mantine/core'
import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ToggleTheme } from '../../common/providers'
import { Login, Registration } from '../auth'
import { Navigation, Logo } from '../../common/components'
import Tasks from './Tasks'
import { ApplicationContext } from '../../common/providers/ContextProvider'
import Welcome from './Welcome'

interface ILayout {
  authorized: boolean
}
export default () => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const tokenState = useContext(ApplicationContext)?.token
  const [authorized, setAuthorized] = useState(false)
  if (!tokenState) return null
  const { token } = tokenState
  useEffect(() => setAuthorized(token !== null), [])

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={
        <Header height={70} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <ToggleTheme />
          </div>
        </Header>
      }
    >
      <Welcome />
    </AppShell>
  )
}
