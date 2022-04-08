import {
  Card,
  Image,
  Text,
  Group,
  Button,
  Badge,
  useMantineTheme,
  Spoiler,
} from '@mantine/core'
import { ICourse } from '../interfaces'

export const CourseComponent = ({
  category,
  description,
  imageUrl,
  title,
  mentor,
}: ICourse) => {
  const theme = useMantineTheme()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  return (
    <div style={{ width: 340 }}>
      <Card shadow="xl" p="lg">
        <Card.Section>
          <Image src={imageUrl} height={160} alt={title} withPlaceholder />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{title}</Text>
          <Badge color="cyan" variant="filled" fullWidth>
            {category}
          </Badge>
          <Group mb="md">
            <Text>მენტორი:</Text>
            <Badge color="cyan" variant="light">
              {mentor}
            </Badge>
          </Group>
        </Group>

        <Spoiler maxHeight={50} showLabel="მეტის ნახვა" hideLabel="აკეცვა">
          <Text>{description}</Text>
        </Spoiler>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          დარეგისტრირდი
        </Button>
      </Card>
    </div>
  )
}
