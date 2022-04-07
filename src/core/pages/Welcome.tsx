import {
  Center,
  Box,
  Button,
  Text,
  Group,
  MediaQuery,
  Image,
  Header,
  Grid,
  useMantineTheme,
} from '@mantine/core'

export default () => {
  const { colorScheme } = useMantineTheme()
  return (
    <Group align="center">
      <Box>
        <Text variant="gradient" weight="bold" size="xl" align="center">
          საუკეთესო გზა სწავლისათვის
        </Text>
        <Button
          variant="gradient"
          gradient={
            colorScheme === 'dark'
              ? { from: 'indigo', to: 'cyan', deg: 45 }
              : { from: 'blue', to: 'dark', deg: 0 }
          }
        >
          დარეგისტრირდი
        </Button>
      </Box>

      <div style={{ width: 600, marginLeft: 'auto', marginRight: 'auto' }}>
        <Image
          radius="md"
          src="https://preview.colorlib.com/theme/oneschool/images/undraw_teaching.svg"
          alt="Random unsplash image"
          withPlaceholder
        />
      </div>
    </Group>
  )
}
