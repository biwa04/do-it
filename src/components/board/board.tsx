'use server'

import { v4 as uuidv4 } from 'uuid'
import { NewTask, TaskToTaskDTO } from '@/domain/entities/task'
import { NewBoardRepository } from '@/infrastructures/repositoryImpls/repositoryImpls'
import KanbanBoardCC from './childComponents/boardCC'
import { NewBoardUsecase } from './usecase'

const usecase = NewBoardUsecase(NewBoardRepository())

export const NewTaskAction = async (taskName: string) => {
  'use server'

  usecase.createNewTask(NewTask(taskName, uuidv4()))

  return
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
