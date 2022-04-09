import { VFC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskData } from '../../types';

type Props = {
  index: number;
  task: TaskData;
  deleteTask: (id: string) => void;
};

export const Task: VFC<Props> = ({ index, task, deleteTask }) => {
  return (
    <Draggable index={index} draggableId={task.draggableId}>
      {(provided) => (
        <div
          className="taskBox"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="taskText">{task.text}</p>
          <button
            className="taskTrashButton"
            onClick={() => deleteTask(task.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      )}
    </Draggable>
  );
};
