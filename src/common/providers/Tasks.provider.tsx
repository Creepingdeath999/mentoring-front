import { from, Observable, zip } from 'rxjs'
import { useHttp } from '../hooks'
import { ITask } from '../interfaces'
export class TaskService {
  private tasks: ITask[]
  protected http: typeof useHttp

  constructor() {
    this.tasks = []
    this.http = useHttp
  }

  private getAlltasks(): Observable<ITask[]> {
    return this.http('allTasks')
  }

  private getActiveTasks(email: string): Observable<number[]> {
    return this.http(`activeTasks?email=${email}`)
  }

  protected processUserTasks(email: string): Promise<ITask[]> {
    const allTasks$ = this.getAlltasks()
    const activeTasks$ = this.getActiveTasks(email)
    return new Promise((resolve) => {
      zip(allTasks$, activeTasks$).subscribe({
        next: ([activeTasks, allTasks]) =>
          this.filterTasks(allTasks, activeTasks),
        complete: () => resolve(this.tasks),
      })
    })
  }

  private filterTasks(activeTasks: Array<number>, allTasks: Array<ITask>) {
    const [currentTasksId] = activeTasks.sort((a, b) => a - b)

    const filtereTasks = allTasks.map((task) => {
      if (activeTasks.includes(task.id)) {
        if (task.id === currentTasksId) {
          return {
            ...task,
            isCompleted: false,
            isCurrent: true,
          }
        }
        return {
          ...task,
          isCompleted: false,
        }
      }
      return { ...task, isCompleted: true }
    })
    this.tasks = filtereTasks
  }

  public StudentTasks(email: string): Observable<ITask[]> {
    return from(this.processUserTasks(email))
  }
}
