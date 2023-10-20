import { APIError } from "@/common/error";
import { Task } from "../entities/task";
import { Result } from "@/common/result";

export interface BackendAPI {
    getTasks(n: number): Result<Task[], APIError>
}
