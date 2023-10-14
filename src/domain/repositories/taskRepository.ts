import { Result } from "@/common/result"
import { Task } from "../entities/task"
import { RepositoryError } from "@/common/error"

interface TaskRepositoryError extends RepositoryError {}

export interface TaskRepository {
    getNTasks(n: number): Result<Task[], TaskRepositoryError>
}
