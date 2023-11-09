import { Task } from '@/domain/entities/task'
import { BaseError } from '@/lib/error'
import { Result } from '@/lib/result'

export interface BoardRepositoryError extends BaseError {
  preError: Error | undefined
}

export interface BoardRepository {
  getTasks: (n: number) => Promise<Result<Task[], BoardRepositoryError>>
  createTask: (task: Task) => Promise<Result<Task, BoardRepositoryError>>
}
