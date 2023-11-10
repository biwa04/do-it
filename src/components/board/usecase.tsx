import { ChangeStatusTo, Task } from '@/domain/entities/task'
import { Status } from '@/domain/valueobjets/status'
import { BaseError } from '@/lib/error'
import { Result, OrElse, CreateFailure } from '@/lib/result'
import { BoardRepository } from './repositories/repository'

type UsecaseError = BaseError & (FailedToGetTasks | FailedToCreateTask)

type FailedToGetTasks = {
  type: 'FailedToGetTasks'
}

type FailedToCreateTask = {
  type: 'FailedToCreateTask'
}

function NewFailedToGetTasksError(
  e: Error,
  name: string | undefined = undefined,
  message: string | undefined = undefined
): UsecaseError {
  return {
    type: 'FailedToGetTasks',
    preError: e,
    name: name || e.name,
    message: message || e.message
  }
}

type Usecase = {
  getNTasks: (n: number) => Promise<Result<Task[], UsecaseError>>
  createNewTask: (task: Task) => Promise<Result<Task, UsecaseError>>
  changeStatus: (task: Task, status: Status) => Promise<Result<Task, UsecaseError>>
}

export function NewBoardUsecase(repo: BoardRepository): Usecase {
  return {
    getNTasks: async (n: number): Promise<Result<Task[], UsecaseError>> => {
      return repo.getTasks(n).then((result) => {
        return OrElse(result)((val) => CreateFailure(NewFailedToGetTasksError(val.value)))
      })
    },

    createNewTask: async (task: Task): Promise<Result<Task, UsecaseError>> => {
      return repo.createTask(task).then((result) => {
        return OrElse(result)((val) =>
          CreateFailure({
            type: 'FailedToCreateTask',
            preError: val.value,
            name: val.value.name,
            message: val.value.message
          })
        )
      })
    },

    changeStatus: async (task: Task, status: Status): Promise<Result<Task, UsecaseError>> => {
      const updatedTask = ChangeStatusTo(task, status)

      return repo.updateTask(updatedTask).then((result) => {
        return OrElse(result)((val) =>
          CreateFailure({
            type: 'FailedToCreateTask',
            preError: val.value,
            name: val.value.name,
            message: val.value.message
          })
        )
      })
    }
  }
}
