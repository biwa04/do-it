import { Status } from "../valueobjets/status"
import { ID } from "../valueobjets/id"

export type Task = {
    id: TaskID
    title: string
    status: Status
}

export type TaskID = ID<string>

const TaskIDClass = {
    toString: (id: TaskID) => id.value,
}

export function ChangeStatusTo(task: Task, status: Status): Task {
    return {
        id: task.id,
        title: task.title,
        status: status,
    }
}

export function NewFunction(title: string, id: string): Task {
    return {
        id: {
            value: id,
            idClass: TaskIDClass,
        },
        title: title,
        status: "ToDo",
    }
}
