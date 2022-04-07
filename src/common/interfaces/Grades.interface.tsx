// student?email=
export interface IGrade {
  studentEmail: string
  mentorEmail: string
  grade: number
  taskId: number
  taskName: string //თუ დაგეზარა ეგ მე ვიზამ დაიკიდე
}

export interface IStudent {
  firstname: string
  lastname: string
  email: string
  role: 'student' | 'mentor'
  grade: number
  mentorEmail: string
  activeTasks: Array<number>
  currentTaskId: number
  finishedTasks: Array<number>
  grades: Array<IGrade>
}

//mentor?email=
interface IMentor {
  firstname: string
  lastname: string
  mentorEmail: string
  students: Array<IStudent>
}
