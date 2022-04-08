import { Box, Button, Text, Group, Image } from '@mantine/core'
import { Ref } from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Group position="center" sx={{ width: '100%' }}>
      <div style={{ width: 600, marginLeft: 'auto', marginRight: 'auto' }}>
        <Image
          radius="md"
          src="https://preview.colorlib.com/theme/oneschool/images/undraw_teaching.svg"
          alt="Random unsplash image"
          withPlaceholder
        />
      </div>
      <Group align="center" position="center">
        <Box sx={{ width: '100%' }}>
          <Text variant="gradient" weight="bold" size="xl" align="center">
            Mentoring
          </Text>
          <Text variant="gradient" weight="bold" size="xl" align="center">
            საუკეთესო გზა სწავლისათვის
          </Text>
        </Box>
        <Button
          sx={{ width: 'min(500px, 90%)' }}
          variant="gradient"
          gradient={{ from: 'purple', to: 'cyan', deg: 45 }}
          component={Link}
          to="/register"
        >
          დარეგისტრირდი
        </Button>
      </Group>
    </Group>
  )
}
