import {
  TextInput,
  PasswordInput,
  Box,
  LoadingOverlay,
  Group,
  Text,
  Button,
  useMantineTheme,
  Center,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { FormEventHandler, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useHttp } from '../../common/hooks'
import { ApplicationContext } from '../../common/providers/ContextProvider'

export const Login = () => {
  const tokenState = useContext(ApplicationContext)?.token
  if (!tokenState) return null
  const { token, setToken } = tokenState
  const navigate = useNavigate()
  const { colorScheme } = useMantineTheme()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })
  useEffect(() => {}, [])
  const [visible, setVisible] = useState<boolean>(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    setVisible(true)
    const subscription$ = useHttp('login', {
      method: 'POST',
      data: form.values,
    }).subscribe({
      next: (data) => {
        const token = data.accessToken
        const { role } = data.user
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        console.log(token)
        setToken(token)
        setVisible(false)
        navigate('/tasks')
      },
      error: ({ response }) => {
        setVisible(false)
      },
    })
    return () => subscription$.unsubscribe()
  }
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <Box sx={{ width: 'min(100%, 500px)', position: 'relative' }}>
      <LoadingOverlay visible={visible} />
      <Group position="center" mt="md">
        <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size="xl"
          weight="bold"
          mb="md"
        >
          Login
        </Text>
      </Group>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextInput
          label="Email"
          required
          placeholder="Enter email"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Password"
          required
          placeholder="Enter password"
          {...form.getInputProps('password')}
        />
        <Group
          position="right"
          mt="md"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Text component={Link} to="/registration">
            Don't have an account? Register
          </Text>
          <Button
            type="submit"
            variant="gradient"
            gradient={
              colorScheme === 'dark'
                ? { from: 'indigo', to: 'cyan', deg: 45 }
                : { from: 'blue', to: 'dark', deg: 0 }
            }
          >
            Login
          </Button>
        </Group>
      </form>
    </Box>
  )
}
