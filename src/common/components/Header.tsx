import {
  Header,
  MediaQuery,
  Burger,
  Group,
  Text,
  Center,
  Navbar,
} from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { ToggleTheme } from '../providers'

interface IApplicationHeader {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}
export const ApplicationHeader = ({
  opened,
  setOpened,
}: IApplicationHeader) => {
  return (
    <Header height={70} p="md">
      <Group>
        <ToggleTheme />
        <Group position="center">
          <Text component={Link} to="/">
            მთავარი
          </Text>
          <Text component={Link} to="/courses">
            კურსები
          </Text>
          <Text component={Link} to="/register">
            რეგისტრაცია
          </Text>
        </Group>
      </Group>
    </Header>
  )
}
