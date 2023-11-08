'use server'

import { NewBoardRepository } from '@/infrastructures/repositoryImpls/repositoryImpls'
import KanbanBoardCC from './childComponents/boardCC'
import { NewBoardUsecase } from './usecase'

export default async function KanbanBoard() {
  const usecase = NewBoardUsecase(NewBoardRepository())
  const tasks = await usecase.getNTasks(30)
  if (tasks.isFailure) {
    console.log(tasks.value)
    return <div></div>
  }

  return <KanbanBoardCC {...{ tasks: tasks.value }}> </KanbanBoardCC>
}
