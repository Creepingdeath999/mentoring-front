import { zip } from 'rxjs'
import { ITask } from '../interfaces'
import { TaskService } from './Tasks.provider'

interface TaskData extends ITask {
  grade: number
}
export class MentorDataService extends TaskService {
  taskData: TaskData[]
  constructor() {
    super()
    this.taskData = []
  }

  private getGrades(email: string) {
    return this.http(`grade?email=${email}`)
  }

  public proceedGrades(email: string) {
    const studentTasks$ = this.StudentTasks(email)
    const grades$ = this.getGrades(email)
    zip(studentTasks$, grades$).subscribe({
      next: ([studentTasks, grades]) => {
        console.log({ studentTasks, grades })
      },
    })
  }
}
