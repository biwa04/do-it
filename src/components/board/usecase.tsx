import { Task } from "@/domain/entities/task"
import { TaskRepository } from "@/domain/repositories/taskRepository"
import { AndThen, CreateFailure, OrElse, Result } from "@/common/result"
import { UsecaseError } from "@/common/error"

interface BoardUsecaseError extends UsecaseError {}

export type BoardUsecase = {
    taskRepository: TaskRepository
}

export function GetNTasks(u: BoardUsecase, n: number): Result<Task[], Error> {
    return OrElse(u.taskRepository.getNTasks(n))((val) => (CreateFailure<BoardUsecaseError>(val.value)))
}
