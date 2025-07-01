Server GitHub Link: https://github.com/Apollo-Level2-Web-Dev/taskmaster-rtk-server

## Local-State-Management-and-RTK-Query

## 23-1 Building the Add Task Form
 - AddTaskModal 
```js
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { useForm } from "react-hook-form"



export function AddTaskModal() {
    const form = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button >Add Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogDescription className="sr-only">Fill up This task Form to add task</DialogDescription>
                    {/* sr-only means only the screen reader can read but this will not be visible. */}
                    <DialogHeader>
                        <DialogTitle>Add Task</DialogTitle>
                    </DialogHeader>
                    {/* changed the form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input  {...field} value={field.value || ""} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} value={field.value || ""} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="mt-4">Priority</FormLabel>
                                        {/* Bind value and onChange to react-hook-form */}
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Priority" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="High">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mt-4">Pick A Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal w-full",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    // disabled={(date) =>
                                                    //     date > new Date() || date < new Date("1900-01-01")
                                                    // }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="mt-4 ">
                                <Button type="submit" className="w-full ">Save changes</Button>
                            </DialogFooter>
                        </form>


                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    )
}
```
## 23-2 Implementing Task Addition
- First make the reducer function to add the data in state 
- Unique is generator is used here. [UUID](https://www.npmjs.com/package/uuid)

```
npm i uuid
```
- tasksSlice.ts

```ts
import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

// make a type 

interface InitialState {
    tasks: ITask[],
    filter: "all" | "high" | "medium" | "low"
}
import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

// make a type 

interface InitialState {
    tasks: ITask[],
    filter: "all" | "high" | "medium" | "low"
}
// this is giving a vibe of schema. 
const initialState: InitialState = {
    tasks: [
        // {
        //     id: "dskdjsdks",
        //     title: "Initialize Frontend",
        //     description: "Create Homepage and Routing",
        //     dueDate: "2025-11",
        //     isCompleted: false,
        //     priority: "High"
        // },
        // {
        //     id: "euryeur",
        //     title: "Create Github Repo",
        //     description: "Make the proper commits ",
        //     dueDate: "2025-11",
        //     isCompleted: false,
        //     priority: "Medium"
        // },
    ],
    filter: "all",
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // type action has been provided here. 
        addTask: (state, action: PayloadAction<ITask>) => {
            const id = uuidv4();
            const taskData = {
                ...action.payload,
                id,
                isCompleted: false
            }
            state.tasks.push(taskData)
            // here push is used. but why? its might mutate right? we do not have to think of it now. Mutation is handled by immer 
        }
    }
})

export const selectTasks = (state: RootState) => {
    return state.todo.tasks
}
export const selectFilter = (state: RootState) => {
    return state.todo.filter
}

export const { addTask } = taskSlice.actions

export default taskSlice.reducer

```

## 23-3 Handling Incomplete Data in Redux

- Lets handle the types and understand where and how to implement 

- type safety of handler function 

```tsx
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        disPatch(addTask(data as ITask))
    }
```
2. SubmitHandler<T> 
   - A type for your form's onSubmit function.
   - It ensures that the function receives data of type T.

1.  FieldValues
   - A generic type representing the shape of your form data.
   - It's the most general form — essentially like saying Record<string, any>.
   - You can replace FieldValues with a custom interface
  
- Both are coming from react hook form. 

| Expression               | Meaning                                                             |
| ------------------------ | ------------------------------------------------------------------- |
| `SubmitHandler<T>`       | Type for a form submit function that takes validated form data `T`. |
| `FieldValues`            | A generic form data type (like `Record<string, any>`).              |
| `data as ITask`          | Type assertion: telling TS to treat `data` as an `ITask` type.      |
| `disPatch(addTask(...))` | Dispatching an action with the form data to the Redux store.        |

- Types inside the reducer function 

```ts 
addTask: (state, action: PayloadAction<ITask>) => {
             const id = uuidv4(); 
             const taskData = { 
                ...action.payload, 
                 id, 
                 isCompleted: false 
             } 
            
            state.tasks.push(taskData)  explain the types related things  
        }
```

1. action: PayloadAction<DraftTask>
   - PayloadAction<T> is a Redux Toolkit utility type that Extends the normal Redux Action type.
   - Adds a .payload property of type T

#### Now Lets Handle this in more efficient way 

```ts
type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">
const createTask = (taskData: DraftTask): ITask => {
    return {
        id: nanoid(),
        isCompleted: false,
        ...taskData
    }
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // type action has been provided here. 
        addTask: (state, action: PayloadAction<DraftTask>) => {
            const taskData = createTask(action.payload)
            state.tasks.push(taskData)
            // here push is used. but why? its might mutate right? we do not have to think of it now. Mutation is handled by immer 
        }
    }
})
```
1.  type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">
   - You're creating a type that extracts only the required fields from ITask that come from user input.
   - This ensures that when a form submits a new task, it does not include id or isCompleted, which will be generated internally.

2. const createTask = (taskData: DraftTask): ITask => { ... }
   - This utility function accepts only user-provided fields (thanks to DraftTask).
   - It generates a full ITask object

   ## 23-4 Managing Task Completion and Deletion
- We can sync the state with the local store using `redux persist`. We will see in our main project 

#### Update task state
- taskSlice.ts

```ts
import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";


// make a type 

interface InitialState {
    tasks: ITask[],
    filter: "all" | "high" | "medium" | "low"
}
// this is giving a vibe of schema. 
const initialState: InitialState = {
    tasks: [
        {
            id: "dskdjsdks",
            title: "Initialize Frontend",
            description: "Create Homepage and Routing",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "High"
        },
        {
            id: "euryeur",
            title: "Create Github Repo",
            description: "Make the proper commits ",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "Medium"
        },
    ],
    filter: "all",
}

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">
const createTask = (taskData: DraftTask): ITask => {
    return {
        id: nanoid(),
        isCompleted: false,
        ...taskData
    }
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // type action has been provided here. 
        addTask: (state, action: PayloadAction<DraftTask>) => {
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload,
            //     id,
            //     isCompleted: false
            // }
            const taskData = createTask(action.payload)
            state.tasks.push(taskData)
            // here push is used. but why? its might mutate right? we do not have to think of it now. Mutation is handled by immer 
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            console.log(action)
            state.tasks.forEach((task) =>
                task.id === action.payload
                    ? (task.isCompleted = !task.isCompleted)
                    : task
            )
        }
    },

})

export const selectTasks = (state: RootState) => {
    return state.todo.tasks
}
export const selectFilter = (state: RootState) => {
    return state.todo.filter
}

export const { addTask, toggleCompleteState } = taskSlice.actions

export default taskSlice.reducer


```

```ts 
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            console.log(action)
            state.tasks.forEach((task) =>
                task.id === action.payload
                    ? (task.isCompleted = !task.isCompleted)
                    : task
            )
        }
```

- TaskCard.tsx


```tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toggleCompleteState } from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { ITask } from "@/types";

import { Trash2 } from "lucide-react";

interface IProps {
    task: ITask;
}
export default function TaskCard({ task }: IProps) {
    const dispatch = useAppDispatch()

    return (
        <div className="border px-5 py-3 rounded-md container ">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {/* clsx used here  */}
                    <div className={cn("size-3 rounded-full", {
                        "bg-green-500": task.priority === "Low",
                        "bg-yellow-500": task.priority === "Medium",
                        "bg-red-600": task.priority === "High"
                    })}>

                    </div>
                    <h1>{task.title}</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <Button variant="link" className="p-0 text-red-500">
                        <Trash2 />
                    </Button>
                    <Checkbox onClick={() => dispatch(toggleCompleteState(task.id))} />
                </div>
            </div>
            <p className="mt-5">{task.description}</p>
        </div>
    );
}

```

```tsx
 <Checkbox onClick={() => dispatch(toggleCompleteState(task.id))} />
```

#### Delete Task. 


```ts
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id != action.payload)
        }
```

```tsx
<h1 className={cn({ "line-through": task.isCompleted })}>{task.title}</h1>
```

```tsx
<Checkbox checked={task.isCompleted} onClick={() => dispatch(toggleCompleteState(task.id))} />
```
## 23-5 Creating Task Filters

- adding tabs 
- Task.tsx

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddTaskModal } from "@/module/AddTaskModal"
import TaskCard from "@/module/TaskCard"
import { selectFilter, selectTasks, updateFilter } from "@/redux/features/task/taskSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"


export default function Task() {
    // const tasks = useAppSelector((state) => state.todo.tasks)

    // we can do this more efficient way by grabbing the tasks inside task slice

    const tasks = useAppSelector(selectTasks)
    const filter = useAppSelector(selectFilter)

    console.log(tasks)
    console.log(filter)

    const dispatch = useAppDispatch()


    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-end items-center">
                <h1 className="mr-auto">Tasks</h1>
                <Tabs defaultValue="all" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger onClick={() => dispatch(updateFilter("all"))} value="all">All</TabsTrigger>
                        <TabsTrigger onClick={() => dispatch(updateFilter("low"))} value="low">Low</TabsTrigger>
                        <TabsTrigger onClick={() => dispatch(updateFilter("medium"))} value="medium">Medium</TabsTrigger>
                        <TabsTrigger onClick={() => dispatch(updateFilter("high"))} value="high">High</TabsTrigger>
                    </TabsList>
                </Tabs>
                <AddTaskModal />
            </div>

            <div className="space-y-5 mt-5">
                {tasks.map((task) => (<TaskCard task={task} key={task.id} />))}
            </div>

        </div>
    )
}

```

- Add the functionality and selector function to handle the logics 

```ts 
import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";


// make a type 

interface InitialState {
    tasks: ITask[],
    filter: "all" | "high" | "medium" | "low"
}
// this is giving a vibe of schema. 
const initialState: InitialState = {
    tasks: [
        {
            id: "dskdjsdks",
            title: "Initialize Frontend",
            description: "Create Homepage and Routing",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "High"
        },
        {
            id: "euryeur",
            title: "Create Github Repo",
            description: "Make the proper commits ",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "Medium"
        },
    ],
    filter: "all",
}

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">
const createTask = (taskData: DraftTask): ITask => {
    return {
        id: nanoid(),
        isCompleted: false,
        ...taskData
    }
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // type action has been provided here. 
        addTask: (state, action: PayloadAction<DraftTask>) => {
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload,
            //     id,
            //     isCompleted: false
            // }
            const taskData = createTask(action.payload)
            state.tasks.push(taskData)
            // here push is used. but why? its might mutate right? we do not have to think of it now. Mutation is handled by immer 
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            console.log(action)
            state.tasks.forEach((task) =>
                task.id === action.payload
                    ? (task.isCompleted = !task.isCompleted)
                    : task
            )
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id != action.payload)
        },
        updateFilter: (state, action: PayloadAction<"all" | "high" | "medium" | "low">) => {
            state.filter = action.payload
        }
    },

})

// selector functions 
export const selectTasks = (state: RootState) => {
    const filter = state.todo.filter
    if (filter === "low") {
        return state.todo.tasks.filter((task) => task.priority === "Low")
    } else if (filter === "medium") {
        return state.todo.tasks.filter((task) => task.priority === "Medium")
    } else if (filter === "high") {
        return state.todo.tasks.filter((task) => task.priority === "High")
    } else {
        return state.todo.tasks
    }

}
export const selectFilter = (state: RootState) => {
    return state.todo.filter
}

export const { addTask, toggleCompleteState, deleteTask, updateFilter } = taskSlice.actions

export default taskSlice.reducer


```

## 23-6 Assigning users to a task
- sees related To User. and also see code of taskCard for watching assigning user related codes. 
- store.ts 

```ts 
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"

import taskReducer from "./features/task/taskSlice"
import userReducer from "./features/user/userSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: taskReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

```
- types.ts 

```ts 
export interface ITask {
    id: string
    title: string
    description: string
    dueDate: string
    isCompleted: boolean
    priority: "High" | "Medium" | "Low",
    assignedTo: string | null
}

export interface IUser {
    id: string
    name: string
}
```
- userSlice.ts

```ts

import type { RootState } from "@/redux/store";
import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
    users: IUser[]
}
const initialState: InitialState = {
    users: [
        {
            id: "QBpNSd38i-t1s_IcdhhX9",
            name: "sazid"
        },
        {
            id: "QBpNSd38i-t1s_IcdhhXdfd",
            name: "shakil"
        }
    ]
}
type DraftUser = Pick<IUser, "name">
const createUser = (userData: DraftUser): IUser => {
    return { id: nanoid(), ...userData }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>) => {
            const userData = createUser(action.payload);
            // console.log(userData)
            state.users.push(userData)
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.id != action.payload)
        }
    }
})

export const selectUser = (state: RootState) => {
    return state.user.users
}

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer
```

- AddUserModal.tsx

```tsx
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { addUser } from "@/redux/features/counter/task/userSlice";

import { useAppDispatch } from "@/redux/hook";
import type { IUser } from "@/types";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

export default function AddUserModal() {
  const dispatch = useAppDispatch();
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(addUser(data as IUser));
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Add User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogDescription className="sr-only">
            Fill up This user Form to add user
          </DialogDescription>
          {/* sr-only means only the screen reader can read but this will not be visible. */}
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          {/* changed the form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-4 ">
                <Button type="submit" className="w-full ">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}

```

- UserCard.tsx

```tsx 
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { deleteUser } from "@/redux/features/counter/task/userSlice";
import { useAppDispatch } from "@/redux/hook";
import type { IUser } from "@/types";

import { Trash2 } from "lucide-react";

interface IProps {
  user: IUser;
}
// export default function TaskCard({ task }: IProps) {
export default function UserCard({ user }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="border px-5 py-3 rounded-md container ">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <h1>{user.name}</h1>
          <Button
            onClick={() => dispatch(deleteUser(user.id))}
            variant="link"
            className="p-0 text-red-500"
          >  
            <Trash2 /> 
          </Button>
          <Button variant="link" className="p-0 text-red-500"></Button>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}

```

## 23-7 Magic of extra reducers

- Lets fix the reset and close modal functionality 


```tsx
export function AddTaskModal() {

    // responsible for closing the modal 
    const [open, setOpen] = useState(false)

    const form = useForm()



    // 
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        disPatch(addTask(data as ITask))
        // responsible for closing the modal 
        setOpen(false)
        // responsible for resetting the form 
        form.reset()
    }

    return (
        // responsible for closing the modal 
        <Dialog open={open} onOpenChange={setOpen}>

        </Dialog>

```

- set the default assignedTo To Null

```ts
import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";


// make a type 

interface InitialState {
    tasks: ITask[],
    filter: "all" | "high" | "medium" | "low"
}
// this is giving a vibe of schema. 
const initialState: InitialState = {
    tasks: [
        {
            id: "dskdjsdks",
            title: "Initialize Frontend",
            description: "Create Homepage and Routing",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "High",
            assignedTo: null
        },
    ],
    filter: "all",
}

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority" | "assignedTo">
const createTask = (taskData: DraftTask): ITask => {
    return {
        ...taskData,
        id: nanoid(),
        isCompleted: false,
        assignedTo: taskData.assignedTo ? taskData.assignedTo : null

    }
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // type action has been provided here. 
        addTask: (state, action: PayloadAction<DraftTask>) => {
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload,
            //     id,
            //     isCompleted: false
            // }
            const taskData = createTask(action.payload)
            state.tasks.push(taskData)
            // here push is used. but why? its might mutate right? we do not have to think of it now. Mutation is handled by immer 
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            console.log(action)
            state.tasks.forEach((task) =>
                task.id === action.payload
                    ? (task.isCompleted = !task.isCompleted)
                    : task
            )
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id != action.payload)
        },
        updateFilter: (state, action: PayloadAction<"all" | "high" | "medium" | "low">) => {
            state.filter = action.payload
        }
    },

})

// selector functions 
export const selectTasks = (state: RootState) => {
    const filter = state.todo.filter
    if (filter === "low") {
        return state.todo.tasks.filter((task) => task.priority === "Low")
    } else if (filter === "medium") {
        return state.todo.tasks.filter((task) => task.priority === "Medium")
    } else if (filter === "high") {
        return state.todo.tasks.filter((task) => task.priority === "High")
    } else {
        return state.todo.tasks
    }

}
export const selectFilter = (state: RootState) => {
    return state.todo.filter
}

export const { addTask, toggleCompleteState, deleteTask, updateFilter } = taskSlice.actions

export default taskSlice.reducer


```

- Lets handle the logic if any user gets deleted. 

![alt text](image.png)

- even if ui shows that null ist set. but redux holds the assignedTo User id. we have to fix this i mean we have to clear this. 
- Based on the removeUser from userSlice we want to do something on taskSlice. here comes the help of `Extra Reducers`
- When there is some dependencies like asynchronous or other slice dependency we will use extra reducers. 
- Extra Reducer gives us builder notation 
- builder notation will tell the store that a user has been  removed. and now what is needed do it. 
- The signal is received inside extra reducer. 

```ts
    extraReducers: (builder) => {
        builder.addCase(removeUser, (state, action) => {
            state.tasks.forEach((task) => task.assignedTo === action.payload ? task.assignedTo = null : task)
        })
    }
```
- taskSlice.ts 
```ts 
import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { removeUser } from '@/redux/features/user/userSlice';


// make a type 

interface InitialState {
    tasks: ITask[],
    filter: "all" | "high" | "medium" | "low"
}
// this is giving a vibe of schema. 
const initialState: InitialState = {
    tasks: [
        {
            id: "dskdjsdks",
            title: "Initialize Frontend",
            description: "Create Homepage and Routing",
            dueDate: "2025-11",
            isCompleted: false,
            priority: "High",
            assignedTo: null
        },
    ],
    filter: "all",
}

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority" | "assignedTo">
const createTask = (taskData: DraftTask): ITask => {
    return {
        ...taskData,
        id: nanoid(),
        isCompleted: false,
        assignedTo: taskData.assignedTo ? taskData.assignedTo : null

    }
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // type action has been provided here. 
        addTask: (state, action: PayloadAction<DraftTask>) => {
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload,
            //     id,
            //     isCompleted: false
            // }
            const taskData = createTask(action.payload)
            state.tasks.push(taskData)
            // here push is used. but why? its might mutate right? we do not have to think of it now. Mutation is handled by immer 
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            console.log(action)
            state.tasks.forEach((task) =>
                task.id === action.payload
                    ? (task.isCompleted = !task.isCompleted)
                    : task
            )
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id != action.payload)
        },
        updateFilter: (state, action: PayloadAction<"all" | "high" | "medium" | "low">) => {
            state.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeUser, (state, action) => {
            state.tasks.forEach((task) => task.assignedTo === action.payload ? task.assignedTo = null : task)
        })
    }

})

// selector functions 
export const selectTasks = (state: RootState) => {
    const filter = state.todo.filter
    if (filter === "low") {
        return state.todo.tasks.filter((task) => task.priority === "Low")
    } else if (filter === "medium") {
        return state.todo.tasks.filter((task) => task.priority === "Medium")
    } else if (filter === "high") {
        return state.todo.tasks.filter((task) => task.priority === "High")
    } else {
        return state.todo.tasks
    }

}
export const selectFilter = (state: RootState) => {
    return state.todo.filter
}

export const { addTask, toggleCompleteState, deleteTask, updateFilter } = taskSlice.actions

export default taskSlice.reducer


```
## 23-8 Local State vs Server State
- RTK and Slice has major difference 


1. **slice :** we are creating createSlice . this for local state
2. **RTK :** Base API => endpoints => server state. When we update a parameter it is directly gets connected to server and updates there. There is no connection with store. When server state is handled the data is stored directly inside db. For sysncing with server state we use RTK Query. 

- `RTK Query` handles the `data fetching` and the `caching`.
- The shareable things are done using RTK as it needs to be stored inside the database. 
- Mostly we will use RTK Query.  

## 23-9 creating API for RTK Query
- As we are integrating the server lets clear the codebase. 

[RTK-QUERY SETUP](https://redux-toolkit.js.org/rtk-query/overview)

- crud operations works are defined in two types in redux
  1. **Query :** get
  2. **Mutation :** update delete, post, put, patch

- src - redux - api - baseApi 


```ts 
// Importing the necessary functions from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Creating a base API instance using createApi
const baseApi = createApi({
    // Unique key for the API reducer in the Redux store
    reducerPath: "baseApi",

    // Defines the base URL for all API calls
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),

    // Define all API endpoints here
    endpoints: (builder) => ({
        // Define a "getTask" endpoint for fetching tasks
        getTask: builder.query({
            // This query will hit the `/tasks` route (full URL: http://localhost:5000/api/tasks)
            query: () => "/tasks"
        })
    })
})

```

## 23-9 creating API for RTK Query
- As we are integrating the server lets clear the codebase. 

[RTK-QUERY SETUP](https://redux-toolkit.js.org/rtk-query/overview)

- crud operations works are defined in two types in redux
  1. **Query :** get
  2. **Mutation :** update delete, post, put, patch

- src - redux - api - baseApi 


```ts 
// Importing the necessary functions from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Creating a base API instance using createApi
const baseApi = createApi({
    // Unique key for the API reducer in the Redux store
    reducerPath: "baseApi",

    // Defines the base URL for all API calls
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),

    // Define all API endpoints here
    endpoints: (builder) => ({
        // Define a "getTask" endpoint for fetching tasks
        getTask: builder.query({
            // This query will hit the `/tasks` route (full URL: http://localhost:5000/api/tasks)
            query: () => "/tasks"
        })
    })
})

```
## 23-10 Connecting the baseApi

```ts 
// made an automatic hook 
export const { useGetTaskQuery } = baseApi
```
- This aromatically creates a `useGetTaskQuery` hook to export \


```ts 
// Importing the necessary functions from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Creating a base API instance using createApi
export const baseApi = createApi({
    // Unique key for the API reducer in the Redux store
    reducerPath: "baseApi",

    // Defines the base URL for all API calls
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),

    // Define all API endpoints here
    endpoints: (builder) => ({
        // Define a "getTask" endpoint for fetching tasks
        getTask: builder.query({
            // This query will hit the `/tasks` route (full URL: http://localhost:5000/api/tasks)
            query: () => "/tasks"
        })
    })
})

// made an automatic hook 
export const { useGetTaskQuery } = baseApi
```

- When we work with RTK Query he will redux will make and give use some middlewares. 
- Data Fetching works will be handled by middlewares. 

- Lets connect the store now 


```ts 

import { configureStore } from "@reduxjs/toolkit"

// Import the baseApi which contains our API slice (created using createApi)
import { baseApi } from "./api/baseApi"

// Creating the Redux store
export const store = configureStore({
    reducer: {
        // Adds the API slice reducer to the Redux store under the key "baseApi"
        // This manages the cache, loading, error, and data state for API requests
        [baseApi.reducerPath]: baseApi.reducer
        // Equivalent to: baseApi: baseApi.reducer
        // baseApi.reducerPath returns "baseApi" by default
    },

    // Enhancing the middleware pipeline with RTK Query's middleware
    // This enables caching, automated refetching, polling, etc.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

```

- By Using this we will get data 

```tsx
    const { data, isLoading, isError } = useGetTaskQuery(undefined)

    console.log({ data, isLoading, isError })
```

- Task.tsx

```ts 
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddTaskModal } from "@/module/AddTaskModal"
import TaskCard from "@/module/TaskCard"
import { useGetTaskQuery } from "@/redux/api/baseApi"
import type { ITask } from "@/types"



export default function Task() {

    const { data, isLoading, isError } = useGetTaskQuery(undefined)

    console.log({ data, isLoading, isError })

    if (isLoading) {
        return <p>Loading ........</p>
    }
    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-end items-center">
                <h1 className="mr-auto">Tasks</h1>
                <Tabs defaultValue="all" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="low">Low</TabsTrigger>
                        <TabsTrigger value="medium">Medium</TabsTrigger>
                        <TabsTrigger value="high">High</TabsTrigger>
                    </TabsList>
                </Tabs>
                <AddTaskModal />
            </div>

            <div className="space-y-5 mt-5">
                {!isLoading && data.tasks.map((task: ITask) => (<TaskCard task={task} key={task._id} />))}
            </div>

        </div>
    )
}

```

- TaskCard.tsx 

```tsx 
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import type { ITask } from "@/types";

import { Trash2 } from "lucide-react";

interface IProps {
    task: ITask;
}
export default function TaskCard({ task }: IProps) {


    return (
        <div className="border px-5 py-3 rounded-md container ">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {/* clsx used here  */}
                    <div className={cn("size-3 rounded-full", {
                        "bg-green-500": task.priority === "Low",
                        "bg-yellow-500": task.priority === "Medium",
                        "bg-red-600": task.priority === "High"
                    })}>

                    </div>
                    <h1 className={cn({ "line-through": task.isCompleted })}>{task.title}</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <Button variant="link" className="p-0 text-red-500">
                        <Trash2 />
                    </Button>
                    <Checkbox checked={task.isCompleted} />
                </div>
            </div>
            <p className="mt-5">Assigned To - </p>
            <p className="mt-5">{task.description}</p>
        </div >
    );
}

```
