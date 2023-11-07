'use server';

import { NewBoardRepository } from "@/infrastructures/repositoryImpls/repositoryImpls";
import KanbanBoardCC from "./boardCC";
import { NewBoardUsecase } from "./usecase";
import { Result } from "@/lib/result";
import { Task } from "@/domain/entities/task";

export default async function KanbanBoard() {
    const usecase = NewBoardUsecase(NewBoardRepository())
    const tasks  = await usecase.getNTasks(30)
    if (tasks.isFailure) {
        console.log(tasks.value)
        return <div></div>
    }

    return (
        <KanbanBoardCC { ...{tasks: tasks.value} }> </KanbanBoardCC>
    )
}
