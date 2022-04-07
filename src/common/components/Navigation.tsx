import { Button, Footer, Group, Navbar, Text } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { Registered, Login, List } from 'tabler-icons-react'
import { NavLink } from './NavLinks'
import { Logout } from './index'
import { useLocalStorage } from '@mantine/hooks'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { ApplicationContext } from '../providers/ContextProvider'
interface INavbar {
  opened: boolean
}

export const Navigation = ({ opened }: INavbar) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow mt="md">
        <NavLink label="Tasks" icon={<List />} path="tasks" />
      </Navbar.Section>
      <Navbar.Section>
        <Logout />
      </Navbar.Section>
    </Navbar>
  )
}
