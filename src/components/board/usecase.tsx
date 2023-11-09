import { Task } from '@/domain/entities/task'
import { BaseError } from '@/lib/error'
import { Result, OrElse, CreateFailure } from '@/lib/result'
import { BoardRepository } from './repositories/repository'

type UsecaseError = BaseError & FailedToGetTasks

type FailedToGetTasks = {
  type: 'FailedToGetTasks'
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
}

export function NewBoardUsecase(repo: BoardRepository): Usecase {
  return {
    getNTasks: async (n: number): Promise<Result<Task[], UsecaseError>> => {
      return repo.getTasks(n).then((result) => {
        return OrElse(result)((val) => CreateFailure(NewFailedToGetTasksError(val.value)))
      })
    }
  }
}
