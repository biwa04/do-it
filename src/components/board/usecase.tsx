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
    getNTasks: (n: number) => Promise<Result<Task[], UsecaseError>>,
}

export function NewBoardUsecase(repo: BoardRepository): Usecase {
    return {
        getNTasks: async (n: number): Promise<Result<Task[], UsecaseError>> => {
            return repo.getTasks(n).then((result) => {
                return OrElse(result)((val) => (CreateFailure(NewUsecaseError(val.value))))
            })
        }
    }
}
