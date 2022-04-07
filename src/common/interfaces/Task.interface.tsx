interface IDetails {
  id: number
  description: string
  learningObjectives: string[]
  instruction: string[]
  className: string
}

export interface ITask extends IDetails {
  isCompleted: boolean
  isCurrent: boolean
  title: string
}
