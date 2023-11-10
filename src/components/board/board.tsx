'use server'

import { v4 as uuidv4 } from 'uuid'
import { NewTask, TaskToTaskDTO } from '@/domain/entities/task'
import { Status } from '@/domain/valueobjets/status'
import { NewBoardRepository } from '@/infrastructures/repositoryImpls/repositoryImpls'
import KanbanBoardCC from './childComponents/boardCC'
import { NewBoardUsecase } from './usecase'

const usecase = NewBoardUsecase(NewBoardRepository())

export const NewTaskAction = async (taskName: string, status: Status) => {
  'use server'

  const task = NewTask(taskName, uuidv4(), status)
  await usecase.createNewTask(task)

  return TaskToTaskDTO(task)
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
