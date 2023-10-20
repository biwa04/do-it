import { Status } from "../valueobjets/status"
import { ID } from "../valueobjets/id"

export type Task = {
    id: ID
    title: string
    status: Status
}

export function ChangeStatusTo(task: Task, status: Status): Task {
    return {
        id: task.id,
        title: task.title,
        status: status,
    }
}
