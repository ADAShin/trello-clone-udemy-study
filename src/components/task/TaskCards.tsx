import { VFC } from 'react';
import { AddTaskCardButton } from './button/AddTaskCardButton';
import { TaskCard } from './TaskCard';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectTaskCards, sortTaskCard } from '../../features/taskCardSlice';

export const TaskCards: VFC = () => {
  const dispatch = useAppDispatch();
  const taskCardList = useAppSelector(selectTaskCards);

  console.log(taskCardList);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    dispatch(
      // タスクカードを並べ変える
      sortTaskCard({
        source: result.source.index,
        destination: result.destination.index,
      })
    );
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
            {taskCardList.map((taskCard, index) => (
              <TaskCard key={taskCard.id} index={index} taskCard={taskCard} />
            ))}
            {provided.placeholder}
            <AddTaskCardButton />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
