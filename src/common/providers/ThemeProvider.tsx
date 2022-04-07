import { ActionIcon, useMantineColorScheme, Tooltip } from '@mantine/core'
import { Sun, Moon } from 'tabler-icons-react'

export const ToggleTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Tooltip label={`${colorScheme} mode`}>
      <ActionIcon
        variant="outline"
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </ActionIcon>
    </Tooltip>
  )
}
