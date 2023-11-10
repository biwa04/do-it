import { FC } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Paper, Stack } from '@mui/material'
import Draggable, { TaskCardParam } from './taskCard'

export type TaskCardLaneParam = {
  id: string
  title: string
  cards: TaskCardParam[]
  children: React.ReactNode
}

const TaskCardLane: FC<TaskCardLaneParam> = ({ id, title, cards, children }) => {
  const { setNodeRef } = useDroppable({ id: id })

  return (
    <Paper sx={{ display: 'inline-block' }}>
      <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
        <Stack
          spacing={1}
          ref={setNodeRef}
          direction={'column'}
          sx={{
            p: 2,
            width: 200
          }}
        >
          <h3>{title}</h3>
          {cards.map((card) => (
            <Draggable key={card.id} id={card.id} title={card.title} status={card.status}></Draggable>
          ))}
          {children}
        </Stack>
      </SortableContext>
    </Paper>
  )
}

export default TaskCardLane
