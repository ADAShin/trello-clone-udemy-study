export type TaskCardData = {
  id: string;
  draggableId: string;
};

export type TaskCardData2 = {
  id: string;
  draggableId: string;
  tasks: TaskData[];
};

export type TaskData = {
  id: string;
  draggableId: string;
  text: string;
};
