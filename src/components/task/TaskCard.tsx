import { VFC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskCardDeleteButton } from './button/TaskCardDeleteButton';
import { TaskAddInput } from './input/TaskAddnput';
import { TaskCardTitle } from './TaskCardTitle';
import { Tasks } from './Tasks';

import { v4 as uuid } from 'uuid';
import { TaskCardData } from '../../types';
import { useAppDispatch } from '../../hooks/redux';
import { addTask, deleteTask, sortTask } from '../../features/taskCardSlice';

type Props = {
  index: number;
  taskCard: TaskCardData;
};

export const TaskCard: VFC<Props> = ({ index, taskCard }) => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState('');

  const inputTextHandler = (input: string) => {
    setInputText(input);
  };

  const addTaskHandler = () => {
    const taskId = uuid();
    dispatch(
      addTask({
        taskCardId: taskCard.id,
        newTaskData: {
          id: taskId,
          draggableId: `task-${taskId}`,
          text: inputText,
        },
      })
    );
    setInputText('');
  };

  const deleteTaskHandler = (id: string) => {
    dispatch(deleteTask({ taskCardId: taskCard.id, removeTaskId: id }));
  };

  const sortTaskHandler = (source: number, destination: number) => {
    // タスクを並び変える
    dispatch(sortTask({ taskCardId: taskCard.id, source, destination }));
  };

  return (
    <Draggable index={index} draggableId={taskCard.draggableId}>
      {(provided) => (
        <div
          className="taskCard"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="taskCardHeader" {...provided.dragHandleProps}>
            <TaskCardTitle taskCardId={taskCard.id} title={taskCard.title} />
            <TaskCardDeleteButton taskCardId={taskCard.id} />
          </div>
          <TaskAddInput
            inputText={inputText}
            inputTextHandler={inputTextHandler}
            addTask={addTaskHandler}
          />
          <Tasks
            taskList={taskCard.tasks}
            deleteTask={deleteTaskHandler}
            sortTask={sortTaskHandler}
          />
        </div>
      )}
    </Draggable>
  );
};
