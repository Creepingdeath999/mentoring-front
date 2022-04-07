import { Group, ThemeIcon, UnstyledButton, Text } from '@mantine/core'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logout as LogoutIcon } from 'tabler-icons-react'
import { ApplicationContext } from '../providers/ContextProvider'
export const Logout = () => {
  const navigate = useNavigate()
  const tokenState = useContext(ApplicationContext)?.token
  if (!tokenState) return null
  const { token, setToken } = tokenState

  return (
    <UnstyledButton
      onClick={() => {
        localStorage.clear()
        setToken(null)
        return navigate('/login')
      }}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color="blue" variant="light">
          <LogoutIcon />
        </ThemeIcon>
        <Text size="sm">Log out</Text>
      </Group>
    </UnstyledButton>
  )
}
