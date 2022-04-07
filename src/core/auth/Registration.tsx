import { useForm } from '@mantine/form'
import {
  PasswordInput,
  Group,
  Button,
  Box,
  Text,
  TextInput,
  useMantineTheme,
  MultiSelect,
  Select,
  LoadingOverlay,
  Center,
} from '@mantine/core'
import { FormEventHandler, useState } from 'react'
import { PasswordStrength } from '../../common/components'
import { Tasks, Mentors } from './Options'
import { Link } from 'react-router-dom'
import { useHttp } from '../../common/hooks'
export const Registration = () => {
  const { colorScheme } = useMantineTheme()
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
  const [visible, setVisible] = useState<boolean>(false)
  const form = useForm({
    initialValues: {
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      activeTasks: [],
      grade: 0,
      mentorEmail: '',
    },

    validate: {
      email: (value) =>
        !emailRegex.exec(value) ? 'invalid email adress' : null,
      password: (value) =>
        !passwordRegex.exec(value)
          ? 'Password must be at last 6 characters long, including uppercase letters and numbers'
          : null,
    },
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const user = {
      ...form.values,
      activeTasks: form.values.activeTasks.map((task) => parseFloat(task)),
      grade: +form.values.grade,
    }
    if (form.validate().hasErrors) {
      return
    }

    setVisible(true)

    const registration$ = useHttp('register', {
      method: 'POST',
      data: user,
    }).subscribe({
      next: (data: any) => {
        setVisible(false)
        console.log(data)
      },
      error: (err: any) => {
        setVisible(false)
        console.log(err.response)
      },
    })

    registration$.unsubscribe()
  }

  return (
    <Center sx={{ height: '100vh' }}>
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
            Registration
          </Text>
        </Group>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Group
            position="apart"
            style={{ display: 'flex', flexFlow: 'row nowrap' }}
          >
            <TextInput
              label="Firstname"
              required
              {...form.getInputProps('firstname')}
              formNoValidate
              style={{ flexBasis: '50%' }}
            />
            <TextInput
              label="Lastname"
              required
              {...form.getInputProps('lastname')}
              formNoValidate
              style={{ flexBasis: '50%' }}
            />
          </Group>
          <TextInput
            label="Email"
            required
            {...form.getInputProps('email')}
            formNoValidate
          />
          <TextInput
            label="Current Grade"
            required
            type="number"
            {...form.getInputProps('grade')}
            formNoValidate
          />
          <PasswordStrength
            value={form.getInputProps('password').value}
            target={
              <PasswordInput
                required
                label="Password"
                placeholder="Password"
                {...form.getInputProps('password')}
              />
            }
          />
          <MultiSelect
            data={Tasks.map((x) => ({
              value: x.value.toString(),
              label: x.label,
            }))}
            label="Tasks which is not graded"
            placeholder="Select tasks"
            {...form.getInputProps('activeTasks')}
          />
          <Select
            required
            data={Mentors}
            label="Choose mentor"
            placeholder="Mentors"
            {...form.getInputProps('mentorEmail')}
          />
          <Group
            position="right"
            mt="md"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Text component={Link} to="/login">
              Already have an account? login
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
              Register
            </Button>
          </Group>
        </form>
      </Box>
    </Center>
  )
}
