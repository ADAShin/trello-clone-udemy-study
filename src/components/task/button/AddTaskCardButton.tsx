import { VFC } from 'react';
import { TaskCardData } from '../TaskCards';
import { v4 as uuid } from 'uuid';

type Props = {
  setTaskCardsList: React.Dispatch<React.SetStateAction<TaskCardData[]>>;
};

export const AddTaskCardButton: VFC<Props> = ({ setTaskCardsList }) => {
  const addTaskCard = () => {
    const taskCardId = uuid();
    setTaskCardsList((prev) => {
      return [
        ...prev,
        { id: taskCardId, draggableId: `task-card-${taskCardId}` },
      ];
    });
  };
  return (
    <div className="addTaskCardButtonArea">
      <button className="addTaskCardButton" onClick={addTaskCard}>
        +
      </button>
    </div>
  );
};
