import { ReactNode, useState } from 'react'
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons'
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core'

interface IPasswordPopOver {
  target: ReactNode
  value: string
}
function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean
  label: string
}) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <CheckIcon /> : <Cross1Icon />} <Box ml={10}>{label}</Box>
    </Text>
  )
}

const requirements = [
  { re: /[0-6]/, label: 'შეიცავს მინიმუმ ერთ ციფრს' },
  { re: /[a-z]/, label: 'შეიცავს მინიმუმ ერთ პატარა ასოს' },
  { re: /[A-Z]/, label: 'შეიცავს მინიმუმ ერთ დიდ ასოს' },
]

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1
    }
  })

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}

export function PasswordStrength({ target, value }: IPasswordPopOver) {
  const [popoverOpened, setPopoverOpened] = useState(false)

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ))

  const strength = getStrength(value)
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      placement="start"
      withArrow
      styles={{ popover: { width: '100%' } }}
      trapFocus={false}
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => setPopoverOpened(false)}
      target={target}
      sx={{ width: '100%' }}
    >
      <Progress
        color={color}
        value={strength}
        size={5}
        style={{ marginBottom: 10 }}
      />
      <PasswordRequirement
        label="შეიცავს მინიმუმ 6 სიმბოლოს"
        meets={value.length > 5}
      />
      {checks}
    </Popover>
  )
}
