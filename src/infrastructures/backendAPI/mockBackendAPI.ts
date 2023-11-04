import { CreateSuccess, Result } from "@/common/result";
import { BackendAPI } from "./backendAPI";
import { Task } from "@/domain/entities/task";
import { IDfromString } from "@/domain/valueobjets/id"
import { NewToDo } from "@/domain/valueobjets/status"
import { v4 as uuidv4 } from 'uuid';

type MockBackendAPIType = {
    readonly container: Task[]
}

export function NewMockBackendAPIType(): MockBackendAPIType {
    return {
        container: [
            {
              id: IDfromString(uuidv4()),
              title: "Task 0",
              status: NewToDo()
            },
            {
              id: IDfromString(uuidv4()),
              title: "Task 1",
              status: NewToDo()
            },
            {
              id: IDfromString(uuidv4()),
              title: "Task 2",
              status: NewToDo()
            },
            {
              id: IDfromString(uuidv4()),
              title: "Task 3",
              status: NewToDo()
            }
          ]
    }
}

export function NewMockBackendAPI(api: MockBackendAPIType): BackendAPI {
    return {
        getTasks:  (n: number): Result<Task[], APIError> => {
            return CreateSuccess(api.container.slice(0,))
        }
    }
}
