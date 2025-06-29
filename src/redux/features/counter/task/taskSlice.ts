import type { RootState } from "@/redux/store";
import type { iTask } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
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
      duaDate: "2025-12",
      isCompleted: false,
      priority: "Low",
    },
  ],
  filter: "all",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<iTask>) => {
      const id = uuidv4();
      const taskTable = {
        ...action.payload,
        id,
        isCompleted: false,
      };
      state.task.push(taskTable);
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
