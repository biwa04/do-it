import { FC } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TaskCardLane, { TaskCardLaneParam } from "./taskCardLane";
import { useState } from "react";
import { Task, ChangeStatusTo } from "@/domain/entities/task";
import { v4 as uuidv4 } from 'uuid';
import { NewToDo, AllStatus, StringToStatus } from "@/domain/valueobjets/status";
import { IDfromString } from "@/domain/valueobjets/id";
import { TaskToTaskCardParam } from "./taskCard";
import { NewMockBackendAPI } from "@/infrastructures/backendAPI/mockBackendAPI";
import { NewBoardUsecase } from "./usecase";

type KanbanBoardParam = {}

const KanbanBoard: FC<KanbanBoardParam> = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  var backendAPI = NewMockBackendAPI()
  const usecase = NewBoardUsecase(backendAPI)

  const [items, setItem] = useState<Task[]>()

  const defaultAnnouncements = {
    onDragOver(e: DragOverEvent) {
      console.log(`Draggable item ${e.active.id} was moved over droppable area ${e.over?.id}.`)
      if (e.over == null) {
        return
      }

      const item = items.find((val, _) => (val.id.value == e.active.id.toString()))
      if (item == undefined) {
        return
      }

      if (e.over.id.toString() in items.map((val, _) => (val.id))) {
        return
      }

      const status = StringToStatus(e.over.id.toString())
      if(status == undefined) {
        return
      }

      const newTask = ChangeStatusTo(item, status)

      setItem(
        items.filter((val, _) => (val.id.value != e.active.id.toString())).concat([newTask])
      )
    },
  }

  return (
    <div>
      <DndContext {...defaultAnnouncements} sensors={sensors}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "400px"}}>
          {AllStatus().map((status, _) => (
            <div key={status}>
            <TaskCardLane id={status} title={status} cards={items.map(TaskToTaskCardParam).filter((val, _) => (val.status == status))}></TaskCardLane>
           </div>
           ))}
        </div>
      </DndContext>
    </div>
  );
}

export default KanbanBoard
