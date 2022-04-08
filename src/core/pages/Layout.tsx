import { AppShell, Button, useMantineTheme, Text, Group } from '@mantine/core'
import { useState } from 'react'
import { ApplicationHeader, CourseComponent } from '../../common/components'
import Welcome from './Welcome'
import { useScrollIntoView } from '@mantine/hooks'
import { Route, Routes } from 'react-router-dom'
import Courses from './Courses'
import { Registration } from '../auth'

export default () => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

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
      header={<ApplicationHeader opened setOpened={setOpened} />}
    >
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="courses" element={<Courses />} />
        <Route path="register" element={<Registration />} />
      </Routes>
    </AppShell>
  )
}
