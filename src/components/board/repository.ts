import { Result } from "@/lib/result";
import { Task } from "@/domain/entities/task";

export interface BoardRepositoryError extends BaseError {}

export interface BoardRepository {
    getTasks: (n: number) => Promise<Result<Task[], BoardRepositoryError>>
}
