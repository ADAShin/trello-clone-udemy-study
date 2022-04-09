import { VFC, useState, useEffect } from 'react';
import { AddTaskCardButton } from './button/AddTaskCardButton';
import { TaskCard } from './TaskCard';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

const reorder = (
  taskCardList: TaskCardData[],
  sourceIndex: number,
  destinationIndex: number
) => {
  const remove = taskCardList.splice(sourceIndex, 1);
  console.log(remove);
  taskCardList.splice(destinationIndex, 0, remove[0]);
};

export type TaskCardData = {
  id: string;
  draggableId: string;
};

export const TaskCards: VFC = () => {
  const [taskCardsList, setTaskCardsList] = useState<TaskCardData[]>([]);

  useEffect(() => {
    const taskCardId = uuid();
    setTaskCardsList((prev) => [
      ...prev,
      { id: taskCardId, draggableId: `task-card-${taskCardId}` },
    ]);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    reorder(taskCardsList, result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-cards" direction="horizontal">
        {(provided) => (
          <div
            className="taskCardsArea"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {taskCardsList.map((taskCard, index) => (
              <TaskCard
                key={taskCard.id}
                index={index}
                taskCard={taskCard}
                setTaskCardsList={setTaskCardsList}
              />
            ))}
            {provided.placeholder}
            <AddTaskCardButton setTaskCardsList={setTaskCardsList} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
