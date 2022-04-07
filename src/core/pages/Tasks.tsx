import { Box, Loader, useMantineTheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TaskComponent } from '../../common/components'
import { ITask } from '../../common/interfaces'
import { TaskService } from '../../common/providers'
import { MentorDataService } from '../../common/providers/MentoDataProvider'
export default () => {
  const taskService = new TaskService()
  const mentorService = new MentorDataService()
  const { colorScheme } = useMantineTheme()
  const [tasks, setTasks] = useState<ITask[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [token] = useLocalStorage({ key: 'token' })
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }
    setLoading(true)
    const tasks$ = taskService
      .StudentTasks('emtchelidze@unisens.ge')
      .subscribe({
        next: (data) => setTasks(data),
        error: ({ response }) => setLoading(false),
        complete: () => setLoading(false),
      })

    return () => {
      tasks$.unsubscribe()
    }
  }, [])

  return loading ? (
    <Loader variant="bars" color={colorScheme === 'dark' ? 'cyan' : 'dark'} />
  ) : tasks ? (
    <Box sx={{ width: '100%' }}>
      {tasks.map((task) => (
        <TaskComponent key={task.id} {...task} />
      ))}
    </Box>
  ) : null
}
