import { Center, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Center sx={{ height: '100vh' }}>
      <Text>OPS...</Text>
      <Text>
        Please <Link to="/logn">Longin</Link> or{' '}
        <Link to="/registration">Register</Link>
        before visiting this page
      </Text>
    </Center>
  )
}
