import { ThemeIcon, Accordion, Text } from '@mantine/core'
import { ShieldCheck, ShieldLock, ShieldChevron } from 'tabler-icons-react'
import { ITask } from '../interfaces'

export const TaskComponent = ({
  isCompleted,
  isCurrent,
  title,
  description,
  learningObjectives,
  instruction,
  id,
}: ITask) => {
  const icon = isCompleted ? (
    <ShieldCheck />
  ) : isCurrent ? (
    <ShieldChevron />
  ) : (
    <ShieldLock />
  )

  const color = isCompleted ? 'green' : isCurrent ? 'yellow' : 'red'
  return (
    <Accordion disableIconRotation sx={{ width: '100%' }}>
      <Accordion.Item
        label={title}
        icon={
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
        }
      >
        {(isCurrent && !isCompleted) || isCompleted ? (
          <>
            {learningObjectives.length > 0 ? (
              <ul>
                <h2>Learning Objectives:</h2>
                {learningObjectives.map((e) => (
                  <li key={e} dangerouslySetInnerHTML={{ __html: e }}></li>
                ))}
              </ul>
            ) : null}
            {instruction.length > 0 ? (
              <ul>
                <h2>Instruction:</h2>
                {instruction.map((e) => (
                  <li key={e} dangerouslySetInnerHTML={{ __html: e }}></li>
                ))}
              </ul>
            ) : null}
            <h2>Task:</h2>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </>
        ) : (
          <Text>Not avaliable yet</Text>
        )}
      </Accordion.Item>
    </Accordion>
  )
}
