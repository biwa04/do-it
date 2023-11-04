import { Task } from "@/domain/entities/task";
import { Result } from "@/common/result";

export interface BackendAPI {
    getTasks: (n: number) => Result<Task[], APIError>
}
