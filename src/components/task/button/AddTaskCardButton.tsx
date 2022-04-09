import { VFC } from 'react';

import { v4 as uuid } from 'uuid';
import { addTaskCard } from '../../../features/taskCardSlice';
import { useAppDispatch } from '../../../hooks/redux';

export const AddTaskCardButton: VFC = () => {
  const dispatch = useAppDispatch();

  const addTaskCardHandler = () => {
    const id = uuid();
    const draggableId = `task-card-${id}`;
    dispatch(addTaskCard({ id, draggableId, tasks: [] }));
  };
  return (
    <div className="addTaskCardButtonArea">
      <button className="addTaskCardButton" onClick={addTaskCardHandler}>
        +
      </button>
    </div>
  );
};
