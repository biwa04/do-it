import { FC, useMemo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Theme } from '@emotion/react'
import { Paper, SxProps, Typography } from '@mui/material'
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
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id
  })

  const style: SxProps<Theme> | undefined = useMemo(() => {
    return {
      transform: CSS.Transform.toString(transform),
      transition
    }
  }, [transform, transition])

  return (
    <Paper
      variant="outlined"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{ mb: 1, p: 1, touchAction: 'none', ...style }}
    >
      <Typography variant="body2">{title}</Typography>
    </Paper>
  )
}

export default TaskCard
