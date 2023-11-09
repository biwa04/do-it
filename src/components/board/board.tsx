'use server'

import { v4 as uuidv4 } from 'uuid'
import { NewTask, TaskToTaskDTO } from '@/domain/entities/task'
import { NewBoardRepository } from '@/infrastructures/repositoryImpls/repositoryImpls'
import KanbanBoardCC from './childComponents/boardCC'
import { NewBoardUsecase } from './usecase'

const usecase = NewBoardUsecase(NewBoardRepository())

export const NewTaskAction = async (formData: FormData) => {
  'use server'

  console.log(formData.get('taskName'))

  const name = formData.get('taskName')?.toString()
  if (name == undefined) {
    return
  }

  usecase.createNewTask(NewTask(name, uuidv4()))

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
