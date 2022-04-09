import React, { VFC, useState } from 'react';
import { editTaskCardTitle } from '../../features/taskCardSlice';
import { useAppDispatch } from '../../hooks/redux';

type Props = {
  taskCardId: string;
  title: string;
};

export const TaskCardTitle: VFC<Props> = ({ taskCardId, title }) => {
  const dispatch = useAppDispatch();
  const [isClick, setIsClick] = useState(false);
  const [inputCardTitle, setInputCardTitle] = useState(title);
  const handleClick = () => {
    setIsClick(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCardTitle(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsClick(false);
    dispatch(editTaskCardTitle({ taskCardId, title: inputCardTitle }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsClick(false);
    dispatch(editTaskCardTitle({ taskCardId, title: inputCardTitle }));
  };

  return (
    <div onClick={handleClick} className="taskCardTitleInputArea">
      {isClick ? (
        <form onSubmit={handleSubmit}>
          <input
            className="taskCardTitleInput"
            autoFocus
            type="text"
            onChange={handleChange}
            value={inputCardTitle}
            onBlur={handleBlur}
            maxLength={10}
          />
        </form>
      ) : (
        <h3>{inputCardTitle}</h3>
      )}
    </div>
  );
};
