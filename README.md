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