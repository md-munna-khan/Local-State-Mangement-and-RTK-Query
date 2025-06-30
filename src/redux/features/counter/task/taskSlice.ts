import Task from "@/pages/Task";
import type { RootState } from "@/redux/store";
import type { iTask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { deleteUser } from "./userSlice";

interface InitialState {
  task: iTask[];
  filter: "all" | "high" | "medium" | "low";
}
const initialState: InitialState = {
  task: [
    {
      id: "abc123",
      title: "Learn React",
      description: "Finish React hooks section",
      dueDate: new Date("2025-07-01"),
      isCompleted: false,
      priority: "high",
      AssignedTo: null,
    },
  ],
  filter: "all",
};
type DraftTask = Pick<
  iTask,
  "title" | "description" | "dueDate" | "priority" | "AssignedTo"
>;

const createTask = (taskData: DraftTask): iTask => {
  return {
    ...taskData,
    id: nanoid(),
    isCompleted: false,
    AssignedTo: taskData.AssignedTo ? taskData.AssignedTo : null,
  };
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<iTask>) => {
      const taskData = createTask(action.payload);
      state.task.push(taskData);
    },
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.task.forEach((task) => {
        if (task.id === action.payload) {
          task.isCompleted = !task.isCompleted;
        }
      });
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.task = state.task.filter((task) => task.id !== action.payload);
    },
    updateFilter: (
      state,
      action: PayloadAction<"all" | "high" | "medium" | "low">
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser, (state, action) => {
      state.task.forEach((task) =>
        task.AssignedTo === action.payload ? (task.AssignedTo = null) : task
      );
    });
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;
  if (filter === "low") {
    return state.todo.task.filter((task) => task.priority === "low");
  } else if (filter === "medium") {
    return state.todo.task.filter((task) => task.priority === "medium");
  } else if (filter === "high") {
    return state.todo.task.filter((task) => task.priority === "high");
  } else {
    return state.todo.task;
  }
};
export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};
export const { addTask, toggleCompleteState, deleteTask, updateFilter } =
  taskSlice.actions;
export default taskSlice.reducer;
