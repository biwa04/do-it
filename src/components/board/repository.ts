import { Result } from "@/common/result";
import { Task } from "@/domain/entities/task";

export interface BoardRepositoryError extends BaseError {}

export interface BoardRepository {
    getTasks: (n: number) => Result<Task[], BoardRepositoryError>
}
