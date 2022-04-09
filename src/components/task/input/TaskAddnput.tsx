import React, { VFC } from 'react';

type Props = {
  inputText: string;
  addTask: () => void;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

export const TaskAddInput: VFC<Props> = ({
  inputText,
  addTask,
  setInputText,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // カードを追加する
    if (inputText === '') {
      return;
    }
    addTask();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="taskAddInput"
          type="text"
          placeholder="add a task"
          onChange={handleChange}
          value={inputText}
        />
      </form>
    </div>
  );
};
