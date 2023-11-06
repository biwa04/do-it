import { BoardRepository, BoardRepositoryError } from "./repository";
import { CreateSuccess, Result } from "@/common/result";
import { NewTask, Task } from "@/domain/entities/task";
import { v4 as uuidv4 } from 'uuid';

export type BoardRepositoryImpMock = BoardRepository

export const BoardRepositoryImpMockInstance = {
    tasks: [
        NewTask("Task 0", uuidv4()),
        NewTask("Task 1", uuidv4()),
        NewTask("Task 2", uuidv4()),
        NewTask("Task 3", uuidv4()),
    ],

    getTasks(n: number): Result<Task[], BoardRepositoryError> {
        return CreateSuccess(this.tasks.slice(0, n));
    }
}
