import { VFC } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Task } from './Task';
import { Task as TaskType } from './TaskCard';

type Props = {
  taskList: TaskType[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const reorder = (
  taskList: TaskType[],
  sourceIndex: number,
  destinationIndex: number
) => {
  const remove = taskList.splice(sourceIndex, 1);
  console.log(remove);
  taskList.splice(destinationIndex, 0, remove[0]);
};

export const Tasks: VFC<Props> = ({ taskList, setTaskList }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    // タスクを並び変える
    reorder(taskList, result.source.index, result.destination.index);
    setTaskList(taskList);
  };

  const deleteTask = (id: string) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskList.map((task, index) => (
                <Task
                  index={index}
                  task={task}
                  key={task.id}
                  deleteTask={deleteTask}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
