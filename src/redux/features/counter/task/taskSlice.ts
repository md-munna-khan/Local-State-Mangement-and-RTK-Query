import type { RootState } from "@/redux/store";
import type { iTask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  task: iTask[];
  filter: "all" | "high" | "medium" | "low";
}
const initialState: InitialState = {
  task: [
    {
      id: "ewrwerwe",
      title: "Initialize frontend",
      description: "Create Home page",
      duaDate: "2025-12",
      isCompleted: false,
      priority: "High",
    },
    {
      id: "ewrwerwesdf",
      title: "Create Github Repo",
      description: "Create Home page",
      dueDate: "2025-12",
      isCompleted: false,
      priority: "Low",
    },
  ],
  filter: "all",
};
type DraftTask=Pick<iTask,"title"|"description"|"dueDate"|"priority">;

const createTask =(taskData:DraftTask):iTask=>{
    return {id:nanoid(),isCompleted:false,...taskData};
} 
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<iTask>) => {
    const taskData=createTask(action.payload)
      state.task.push(taskData);
    },
  },
});

export const selectTasks = (state: RootState) => {
  return state.todo.task;
};
export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};
export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
