import { VFC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskCardDeleteButton } from './button/TaskCardDeleteButton';
import { TaskAddInput } from './input/TaskAddnput';
import { TaskCardData } from './TaskCards';
import { TaskCardTitle } from './TaskCardTitle';
import { Tasks } from './Tasks';

import { v4 as uuid } from 'uuid';

export type Task = {
  id: string;
  draggableId: string;
  text: string;
};

type Props = {
  index: number;
  taskCard: TaskCardData;
  setTaskCardsList: React.Dispatch<React.SetStateAction<TaskCardData[]>>;
};

export const TaskCard: VFC<Props> = ({ index, taskCard, setTaskCardsList }) => {
  const [inputText, setInputText] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);

  const deleteTaskCard = () => {
    setTaskCardsList((prev) =>
      prev.filter((taskCardData) => taskCardData.id !== taskCard.id)
    );
  };

  const addTask = () => {
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
            <TaskCardDeleteButton deleteTaskCard={deleteTaskCard} />
          </div>
          <TaskAddInput
            inputText={inputText}
            setInputText={setInputText}
            addTask={addTask}
          />
          <Tasks taskList={taskList} setTaskList={setTaskList} />
        </div>
      )}
    </Draggable>
  );
};
