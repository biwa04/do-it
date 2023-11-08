import { PrismaClient } from '@prisma/client'
import { NewTask, Task } from '@/domain/entities/task'
import { CreateFailure, CreateSuccess, Result } from '@/lib/result'
import { BoardRepository, BoardRepositoryError } from './repository'

export type BoardRepositoryImpPrisma = BoardRepository & {
  value: PrismaClient
}
export type BoardRepositoryImpPrismaError = BoardRepositoryError &
  (UnknownError | FailedToGetTasksFromDBBoardRepositoryError)

type UnknownError = {
  preError: Error
  name: 'UnknownError'
  message: 'Unknown error.'
}
type FailedToGetTasksFromDBBoardRepositoryError = {
  preError: Error
  name: 'UnknownError'
  message: 'Unknown error.'
}

function NewUnknownError(err: Error): UnknownError {
  return {
    preError: err,
    name: 'UnknownError',
    message: 'Unknown error.'
  }
}

export function NewBoardRepositoryImpPrisma(prisma: PrismaClient): BoardRepositoryImpPrisma {
  const BoardRepositoryImpPrismaInstance: BoardRepositoryImpPrisma = {
    value: prisma,

    async getTasks(n: number): Promise<Result<Task[], BoardRepositoryError>> {
      const result = await this.value.task
        .findMany({
          take: n,
          orderBy: {
            createdAt: 'desc'
          }
        })
        .then((tasks) => {
          return CreateSuccess(
            tasks.map((task) => {
              return NewTask(task.title, task.id)
            })
          )
        })
        .catch((error) => {
          return CreateFailure<BoardRepositoryError>(NewUnknownError(error))
        })

      return result
    }
  }

  return BoardRepositoryImpPrismaInstance
}
