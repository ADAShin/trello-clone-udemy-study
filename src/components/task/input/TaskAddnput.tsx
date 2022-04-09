import React, { VFC } from 'react';

type Props = {
  inputText: string;
  addTask: () => void;
  inputTextHandler: (input: string) => void;
};

export const TaskAddInput: VFC<Props> = ({
  inputText,
  addTask,
  inputTextHandler,
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
    inputTextHandler(e.target.value);
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
