import type { RootState } from "@/redux/store";
import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  users: IUser[];
}
const initialState: InitialState = {
  users: [
    {
id:"rw5r234rwe",
name:"munna"
    },
    {
id:"rw5r234rwesdf",
name:"mir"
    },
  ],
};
type DraftUser = Pick<IUser, "name">;

const createUser = (userData: DraftUser): IUser => {
  return { id: nanoid(), ...userData };
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const taskData = createUser(action.payload);
      state.users.push(taskData);
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((task) => task.id !== action.payload);
    },
  },
});

export const selectUser = (state: RootState) => {
  return state.user.users;
};
export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
