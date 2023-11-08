import { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/domain/entities/task'
import { Status } from '@/domain/valueobjets/status'

export type TaskCardParam = {
  id: string
  title: string
  status: Status
}

export function TaskToTaskCardParam(task: Task): TaskCardParam {
  return {
    id: task.id.value,
    title: task.title,
    status: task.status
  }
}

const TaskCard: FC<TaskCardParam> = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id
  })

  const style = {
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default TaskCard
