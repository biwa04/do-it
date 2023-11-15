'use client'

import { KeyboardEventHandler, useState, useTransition } from 'react'
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverEvent } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Stack } from '@mui/material'
import { Task, ChangeStatusTo, TaskDTO, TaskDTOtoTaskEntity, TaskToTaskDTO } from '@/domain/entities/task'
import { AllStatus, Status, StringToStatus } from '@/domain/valueobjets/status'
import { ChangeTaskAction, NewTaskAction } from '../board'
import { InputCard, TaskToTaskCardParam } from './taskCard'
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
  const [, startTransition] = useTransition()

  const defaultAnnouncements = {
    onDragOver(e: DragOverEvent) {
      // デバッグ用のログ
      console.log(`Draggable item ${e.active.id} was moved over droppable area ${e.over?.id}.`)
      if (e.over == null) {
        return
      }

      // ドラッグ中のタスクを取得
      const item = items.find((val) => val.id.idClass.toString(val.id) == e.active.id.toString())
      if (item == undefined) {
        return
      }

      // ドロップ先のIDを取得
      const dragOverID = e.over.id.toString()

      // ドロップ先のIDからステータスを取得 (タスクレーンの場合 : タスクカードの場合)
      const dragOverTask = items.find((val) => val.id.idClass.toString(val.id) == dragOverID)

      const status = dragOverTask == undefined ? StringToStatus(dragOverID) : dragOverTask.status

      if (status == undefined) return

      startTransition(() => {
        ChangeTaskAction(TaskToTaskDTO(item), status).then((task) => {
          if (task.isSuccess) return

          setItem(items.filter((val) => val.id.idClass.toString(val.id) != e.active.id.toString()).concat([item]))
        })
      })

      const newTask = ChangeStatusTo(item, status)

      setItem(items.filter((val) => val.id.idClass.toString(val.id) != e.active.id.toString()).concat([newTask]))
    }
  }

  // From: New Task
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
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="start" sx={{ minHeight: 500 }}>
          {AllStatus().map((status) => (
            <TaskCardLane
              id={status}
              title={status}
              cards={items.map(TaskToTaskCardParam).filter((val) => val.status == status)}
              key={status}
            >
              <InputCard
                id={status}
                value={inputTaskNameValues[status]}
                onChange={(e) => {
                  setInputTaskNameValues({ ...inputTaskNameValues, [status]: e.target.value })
                }}
                onKeyDown={handleKeyDown}
                placeholder="New Task"
              ></InputCard>
            </TaskCardLane>
          ))}
        </Stack>
      </DndContext>
    </div>
  )
}

export default KanbanBoardCC
