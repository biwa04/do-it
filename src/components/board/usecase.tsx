import { Task } from "@/domain/entities/task"
import { AndThen, CreateFailure, OrElse, Result } from "@/common/result"
import { UsecaseError } from "@/common/error"
import { BackendAPI } from  "@/infrastructures/backendAPI/backendAPI"

interface BoardUsecaseError extends UsecaseError {}

export type BoardUsecase = {
    backendAPI: BackendAPI
}

export function GetNTasks(u: BoardUsecase, n: number): Result<Task[], Error> {
    return OrElse(u.backendAPI.getTasks(n))((val) => (CreateFailure<BoardUsecaseError>(val.value)))
}
