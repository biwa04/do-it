import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Draggable, { TaskCardParam } from "./taskCard";

export type TaskCardLaneParam = {
  id: string;
  title: string;
  cards: TaskCardParam[];
};

const TaskCardLane: FC<TaskCardLaneParam> = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id: id });

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} style={{display: "inline-block", minHeight: "300px"}}>
        <h3>{title}</h3>

        {cards.map((card) => (
          <Draggable key={card.id} id={card.id} title={card.title} status={card.status}></Draggable>
        ))}
      </div>
    </SortableContext>
  );
};

export default TaskCardLane;
