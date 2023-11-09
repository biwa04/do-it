import { ID } from '../valueobjets/id'
import { Status } from '../valueobjets/status'
import { Entity } from './entity'

// Define value objects

export type TaskID = ID<string>
const TaskIDClass = {
  toString: (id: TaskID) => id.value
}

// Define Entities

export type TaskDTO = {
  id: string
  title: string
  status: Status
}

export type Task = {
  id: TaskID
  title: string
  status: Status
} & Entity<Task, TaskDTO>

export function TaskToTaskDTO(task: Task): TaskDTO {
  return {
    id: task.id.value,
    title: task.title,
    status: task.status
  }
}

export function TaskDTOtoTaskEntity(dto: TaskDTO): Task {
  return {
    id: {
      value: dto.id,
      idClass: TaskIDClass
    },
    title: dto.title,
    status: dto.status,
    toDTO: TaskToTaskDTO,
    toEntity: TaskDTOtoTaskEntity
  }
}

// Define methods

export function ChangeStatusTo(task: Task, status: Status): Task {
  return {
    id: task.id,
    title: task.title,
    status: status,
    toDTO: TaskToTaskDTO,
    toEntity: TaskDTOtoTaskEntity
  }
}

export function NewTask(title: string, id: string): Task {
  return {
    id: {
      value: id,
      idClass: TaskIDClass
    },
    title: title,
    status: 'ToDo',
    toDTO: TaskToTaskDTO,
    toEntity: TaskDTOtoTaskEntity
  }
}
