import { ID } from '../valueobjets/id'
import { Status } from '../valueobjets/status'

export type Task = {
  id: TaskID
  title: string
  status: Status
}

export type TaskID = ID<string>

const TaskIDClass = {
  toString: (id: TaskID) => id.value
}

export function ChangeStatusTo(task: Task, status: Status): Task {
  return {
    id: task.id,
    title: task.title,
    status: status
  }
}

export function NewTask(title: string, id: string): Task {
  return {
    id: {
      value: id,
      idClass: TaskIDClass
    },
    title: title,
    status: 'ToDo'
  }
}
