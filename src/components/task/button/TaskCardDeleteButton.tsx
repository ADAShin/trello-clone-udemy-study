import { VFC } from 'react';

type Props = {
  deleteTaskCard: () => void;
};

export const TaskCardDeleteButton: VFC<Props> = ({ deleteTaskCard }) => {
  return (
    <div>
      <button className="taskCardDeleteButton" onClick={deleteTaskCard}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};
