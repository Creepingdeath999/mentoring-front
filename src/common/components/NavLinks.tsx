import { Group, ThemeIcon, UnstyledButton, Text, Button } from '@mantine/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface INavlink {
  label: string
  icon: ReactNode
  path: string
  onClick?: any
}
export const NavLink = ({ icon, label, path, onClick }: INavlink) => {
  return (
    <Link to={path} onClick={onClick}>
      <UnstyledButton
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
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  )
}
