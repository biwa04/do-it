import { PrismaClient } from '@prisma/client'
import { Status as StatusAtPrisma } from '@prisma/client'
import { NewTask, Task } from '@/domain/entities/task'
import { Status } from '@/domain/valueobjets/status'
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

function statusValueToStatusAtPrisma(status: Status): StatusAtPrisma {
  switch (status) {
    case 'ToDo':
      return 'TODO'
    case 'Doing':
      return 'DOING'
    case 'Waiting':
      return 'WATING'
    case 'Success':
      return 'SUCCESS'
    case 'Failed':
      return 'FAILED'
  }
}

function statusAtPrismaToStatusValue(status: StatusAtPrisma): Status {
  switch (status) {
    case 'TODO':
      return 'ToDo'
    case 'DOING':
      return 'Doing'
    case 'WATING':
      return 'Waiting'
    case 'SUCCESS':
      return 'Success'
    case 'FAILED':
      return 'Failed'
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
            createdAt: 'asc'
          }
        })
        .then((tasks) => {
          return CreateSuccess(
            tasks.map((task) => {
              return NewTask(task.title, task.id, statusAtPrismaToStatusValue(task.status))
            })
          )
        })
        .catch((error) => {
          return CreateFailure<BoardRepositoryError>(NewUnknownError(error))
        })

      return result
    },

    async createTask(task: Task): Promise<Result<Task, BoardRepositoryError>> {
      const result = await this.value.task
        .create({
          data: {
            id: task.id.value,
            title: task.title,
            status: statusValueToStatusAtPrisma(task.status)
          }
        })
        .then((task) => {
          return CreateSuccess(NewTask(task.title, task.id))
        })
        .catch((error) => {
          return CreateFailure<BoardRepositoryError>(NewUnknownError(error))
        })

      return result
    },

    async updateTask(task: Task): Promise<Result<Task, BoardRepositoryError>> {
      const result = await this.value.task
        .update({
          where: {
            id: task.id.value
          },
          data: {
            title: task.title,
            status: statusValueToStatusAtPrisma(task.status)
          }
        })
        .then((task) => {
          return CreateSuccess(NewTask(task.title, task.id, statusAtPrismaToStatusValue(task.status)))
        })
        .catch((error) => {
          return CreateFailure<BoardRepositoryError>(NewUnknownError(error))
        })

      return result
    }
  }

  return BoardRepositoryImpPrismaInstance
}
