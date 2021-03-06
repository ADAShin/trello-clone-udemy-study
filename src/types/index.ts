export type TaskCardData = {
  id: string;
  draggableId: string;
  title: string;
  tasks: TaskData[];
};

export type TaskData = {
  id: string;
  draggableId: string;
  text: string;
};
