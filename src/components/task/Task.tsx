import { VFC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from './TaskCard';

type Props = {
  index: number;
  task: TaskType;
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
