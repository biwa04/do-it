'use server'

import { v4 as uuidv4 } from 'uuid'
import { NewTask, TaskDTO, TaskDTOtoTaskEntity, TaskToTaskDTO } from '@/domain/entities/task'
import { Status } from '@/domain/valueobjets/status'
import { NewBoardRepository } from '@/infrastructures/repositoryImpls/repositoryImpls'
import { CreateFailure, CreateSuccess } from '@/lib/result'
import KanbanBoardCC from './childComponents/boardCC'
import { NewBoardUsecase } from './usecase'

const usecase = NewBoardUsecase(NewBoardRepository())

export const NewTaskAction = async (taskName: string, status: Status) => {
  'use server'

  const task = NewTask(taskName, uuidv4(), status)
  await usecase.createNewTask(task)

  return TaskToTaskDTO(task)
}

export const ChangeTaskAction = async (task: TaskDTO, status: Status) => {
  'use server'

  const result = await usecase.changeStatus(TaskDTOtoTaskEntity(task), status).then((result) => {
    if (result.isSuccess) {
      return CreateSuccess(TaskToTaskDTO(result.value))
    }

    return CreateFailure(result.value)
  })

  return result
}

export default async function KanbanBoard() {
  const tasksResult = await usecase.getNTasks(30)
  if (tasksResult.isFailure) {
    console.log(tasksResult.value)
    return <div></div>
  }

  const tasks = tasksResult.value
  const taskDTOs = tasks.map((t) => {
    return TaskToTaskDTO(t)
  })

  return <KanbanBoardCC tasks={taskDTOs} />
}
