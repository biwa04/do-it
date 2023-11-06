import { Task } from "@/domain/entities/task"
import { Result, OrElse, CreateFailure } from "@/common/result"
import { BackendAPI } from "@/infrastructures/backendAPI/backendAPI"
import { BoardRepository } from "./repository"

interface UsecaseError extends BaseError {}

type getNTasksError = UsecaseError

function NewUsecaseError(e: Error): getNTasksError {
    return {
        preError: e,
        name: "getNTasksError",
        message: "Failed to get tasks"
    }
}

type Usecase = {
    getNTasks: (n: number) => Result<Task[], UsecaseError>,
}

export function NewBoardUsecase(repo: BoardRepository): Usecase {
    return {
        getNTasks: (n: number): Result<Task[], UsecaseError> => {
            console.log(repo.getTasks(n))
            return OrElse(repo.getTasks(n))((val) => (CreateFailure(NewUsecaseError(val.value))))
        }
    }
}
