import { Task } from "@/domain/entities/task"
import { Result, OrElse, CreateFailure } from "@/common/result"
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
            return OrElse(repo.getTasks(n))((val) => (CreateFailure(NewUsecaseError(val.value))))
        }
    }
}
