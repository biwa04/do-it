import { Task } from "@/domain/entities/task";
import { Result } from "@/common/result";

export interface BackendAPI<T> {
    getTasks: (api: T) => (n: number) => Result<Task[], APIError>
}
