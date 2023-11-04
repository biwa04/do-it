import { Task } from "@/domain/entities/task"
import { Result, OrElse, CreateFailure } from "@/common/result"
import { BackendAPI } from "@/infrastructures/backendAPI/backendAPI"

interface UsecaseError extends BaseError {
}

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

export function NewBoardUsecase(api: BackendAPI): Usecase {
    return {
        getNTasks: (n: number): Result<Task[], UsecaseError> => {
            return OrElse(api.getTasks(n))((val) => (CreateFailure(NewUsecaseError(val.value))))
        }
    }
}
