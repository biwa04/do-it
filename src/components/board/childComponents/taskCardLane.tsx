import { FC } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Stack } from '@mui/material'
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
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <Stack
        spacing={1}
        ref={setNodeRef}
        sx={{
          p: 2,
          flexGrow: 1,
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h3>{title}</h3>
        {cards.map((card) => (
          <Draggable key={card.id} id={card.id} title={card.title} status={card.status}></Draggable>
        ))}
        {children}
      </Stack>
    </SortableContext>
  )
}

export default TaskCardLane
