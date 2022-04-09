import { VFC } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { TaskData } from '../../types';
import { Task } from './Task';

type Props = {
  taskList: TaskData[];
  deleteTask: (taskId: string) => void;
  sortTask: (source: number, destination: number) => void;
};

export const Tasks: VFC<Props> = ({ taskList, deleteTask, sortTask }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    // タスクを並び変える
    sortTask(result.source.index, result.destination.index);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskList.map((task, index) => (
                <Task
                  index={index}
                  task={task}
                  key={task.id}
                  deleteTask={() => deleteTask(task.id)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
