import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TaskCardData, TaskData } from '../types';
import { RootState } from './store';

const reorder = <T>(targetList: T[], source: number, destination: number) => {
  const remove = targetList.splice(source, 1);
  console.log(remove);
  targetList.splice(destination, 0, remove[0]);
};

export type TaskCardState = {
  taskCards: TaskCardData[];
};

const createInitialData = (): TaskCardState => {
  const id = uuid();
  const draggableId = `task-card-${id}`;
  return {
    taskCards: [{ id, draggableId, tasks: [] }] as TaskCardData[],
  };
};

const initialState: TaskCardState = createInitialData();

export const taskCardSlice = createSlice({
  name: 'taskCard',
  initialState,
  reducers: {
    addTaskCard: (state, action: PayloadAction<TaskCardData>) => ({
      ...state,
      taskCards: [...state.taskCards, action.payload],
    }),
    deleteTaskCard: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        taskCards: state.taskCards.filter(
          (taskCard) => taskCard.id !== action.payload
        ),
      };
    },
    sortTaskCard: (
      state,
      action: PayloadAction<{ source: number; destination: number }>
    ) => {
      const { source, destination } = action.payload;
      reorder(state.taskCards, source, destination);
    },
    addTask: (
      state,
      action: PayloadAction<{ taskCardId: string; newTaskData: TaskData }>
    ) => {
      const { taskCardId, newTaskData } = action.payload;
      state.taskCards.forEach((taskCard) => {
        if (taskCard.id === taskCardId) {
          taskCard.tasks.push(newTaskData);
        }
      });
    },
    deleteTask: (
      state,
      action: PayloadAction<{ taskCardId: string; removeTaskId: string }>
    ) => {
      const { taskCardId, removeTaskId } = action.payload;
      state.taskCards.forEach((taskCard) => {
        if (taskCard.id === taskCardId) {
          taskCard.tasks = taskCard.tasks.filter(
            (task) => task.id !== removeTaskId
          );
        }
      });
    },
    sortTask: (
      state,
      action: PayloadAction<{
        taskCardId: string;
        source: number;
        destination: number;
      }>
    ) => {
      const { taskCardId, source, destination } = action.payload;
      state.taskCards.forEach((taskCard) => {
        if (taskCard.id === taskCardId) {
          reorder(taskCard.tasks, source, destination);
        }
      });
    },
  },
});

export const {
  addTaskCard,
  deleteTaskCard,
  sortTaskCard,
  addTask,
  deleteTask,
  sortTask,
} = taskCardSlice.actions;

export const selectTaskCards = (state: RootState) => state.taskCard.taskCards;

export default taskCardSlice.reducer;
