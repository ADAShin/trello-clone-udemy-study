import { VFC } from 'react';
import { deleteTaskCard } from '../../../features/taskCardSlice';
import { useAppDispatch } from '../../../hooks/redux';

type Props = {
  taskCardId: string;
};

export const TaskCardDeleteButton: VFC<Props> = ({ taskCardId }) => {
  const dispatch = useAppDispatch();

  const deleteTaskCardHandler = () => {
    dispatch(deleteTaskCard(taskCardId));
  };

  return (
    <div>
      <button className="taskCardDeleteButton" onClick={deleteTaskCardHandler}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};
