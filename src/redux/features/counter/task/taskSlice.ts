import type { RootState } from "@/redux/store";
import type { iTask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
interface InitialState{
    task:iTask[],
    filter:"all"|"high"|"medium"|"low"
}
const initialState :InitialState={
    task:[
        {
        id:"ewrwerwe",
        title:"Initialize frontend",
        description:"Create Home page",
        duaDate:"2025-12",
        isCompleted:false,
        priority:"High"
   
}, 
        {
        id:"ewrwerwesdf",
        title:"Create Github Repo",
        description:"Create Home page",
        duaDate:"2025-12",
        isCompleted:false,
        priority:"Low"
   
}],
filter:"all" };

const taskSlice = createSlice({
name:"task",
initialState,
reducers:{

}
});

export const selectTasks = (state:RootState)=>{
    return state.todo.task;
}
export const selectFilter = (state:RootState)=>{
    return state.todo.filter;
}

export default taskSlice.reducer;