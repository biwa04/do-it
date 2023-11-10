'use client'

import { KeyboardEventHandler, useState, useTransition } from 'react'
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverEvent } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Task, ChangeStatusTo, TaskDTO, TaskDTOtoTaskEntity } from '@/domain/entities/task'
import { AllStatus, Status, StringToStatus } from '@/domain/valueobjets/status'
import { NewTaskAction } from '../board'
import { TaskToTaskCardParam } from './taskCard'
import TaskCardLane from './taskCardLane'

export type KanbanBoardParam = {
  tasks: TaskDTO[]
}

const KanbanBoardCC = (props: KanbanBoardParam) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const [items, setItem] = useState<Task[]>(props.tasks.map((val) => TaskDTOtoTaskEntity(val)))

  const defaultAnnouncements = {
    onDragOver(e: DragOverEvent) {
      console.log(`Draggable item ${e.active.id} was moved over droppable area ${e.over?.id}.`)
      if (e.over == null) {
        return
      }

      const item = items.find((val) => val.id.idClass.toString(val.id) == e.active.id.toString())
      if (item == undefined) {
        return
      }

      if (e.over.id.toString() in items.map((val) => val.id)) {
        return
      }

      const status = StringToStatus(e.over.id.toString())
      if (status == undefined) {
        return
      }

      const newTask = ChangeStatusTo(item, status)

      setItem(items.filter((val) => val.id.idClass.toString(val.id) != e.active.id.toString()).concat([newTask]))
    }
  }

  // From: New Task
  const [, startTransition] = useTransition()
  const [inputTaskNameValues, setInputTaskNameValues] = useState<{
    [key in Status]: string
  }>(
    AllStatus().reduce(
      (acc, val) => {
        acc[val] = ''
        return acc
      },
      {} as { [key in Status]: string }
    )
  )

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    // Enter + Ctrl or Enter + Command
    if (!(e.key == 'Enter' && (e.ctrlKey || e.metaKey))) return

    // タスクの作成
    const status = StringToStatus(e.currentTarget.id)
    if (status == undefined) return

    startTransition(() => {
      NewTaskAction(e.currentTarget.value, status).then((task) => {
        setItem(items.concat([TaskDTOtoTaskEntity(task)]))
      })
    })

    // 入力欄のクリア
    setInputTaskNameValues({ ...inputTaskNameValues, [e.currentTarget.id]: '' })
  }

  return (
    <div>
      <DndContext {...defaultAnnouncements} sensors={sensors}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '400px' }}>
          {AllStatus().map((status) => (
            <div key={status}>
              <TaskCardLane
                id={status}
                title={status}
                cards={items.map(TaskToTaskCardParam).filter((val) => val.status == status)}
              ></TaskCardLane>

              <input
                type="text"
                value={inputTaskNameValues[status]}
                onChange={(e) => {
                  setInputTaskNameValues({ ...inputTaskNameValues, [status]: e.target.value })
                }}
                id={status}
                onKeyDown={handleKeyDown}
              ></input>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  )
}

export default KanbanBoardCC
