import { VFC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskCardDeleteButton } from './button/TaskCardDeleteButton';
import { TaskAddInput } from './input/TaskAddnput';
import { TaskCardTitle } from './TaskCardTitle';
import { Tasks } from './Tasks';

import { v4 as uuid } from 'uuid';
import { TaskCardData, TaskData } from '../../types';

const reorder = (
  taskList: TaskData[],
  sourceIndex: number,
  destinationIndex: number
) => {
  const remove = taskList.splice(sourceIndex, 1);
  console.log(remove);
  taskList.splice(destinationIndex, 0, remove[0]);
};

type Props = {
  index: number;
  taskCard: TaskCardData;
  deleteTaskCard: (cardId: string) => void;
};

export const TaskCard: VFC<Props> = ({ index, taskCard, deleteTaskCard }) => {
  const [inputText, setInputText] = useState('');
  const [taskList, setTaskList] = useState<TaskData[]>([]);

  const inputTextHandler = (input: string) => {
    setInputText(input);
  };

  const addTaskHandler = () => {
    const taskId = uuid();
    setTaskList((prev) => [
      ...prev,
      {
        id: taskId,
        draggableId: `task-${taskId}`,
        text: inputText,
      },
    ]);
    setInputText('');
  };

  const deleteTaskHandler = (id: string) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const sortTaskHandler = (source: number, destination: number) => {
    // タスクを並び変える
    reorder(taskList, source, destination);
    setTaskList(taskList);
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
            <TaskCardTitle />
            <TaskCardDeleteButton
              deleteTaskCard={() => deleteTaskCard(taskCard.id)}
            />
          </div>
          <TaskAddInput
            inputText={inputText}
            inputTextHandler={inputTextHandler}
            addTask={addTaskHandler}
          />
          <Tasks
            taskList={taskList}
            deleteTask={deleteTaskHandler}
            sortTask={sortTaskHandler}
          />
        </div>
      )}
    </Draggable>
  );
};
