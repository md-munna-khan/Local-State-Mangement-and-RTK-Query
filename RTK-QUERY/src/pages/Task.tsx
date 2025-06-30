import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddTaskModal } from "@/module/tasks/AddTaskModal";
import TaskCard from "@/module/tasks/TaskCard";
import {
  selectFilter,
  selectTasks,
  updateFilter,
} from "@/redux/features/counter/task/taskSlice";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";

export default function Task() {
  const task = useAppSelector(selectTasks);
  const filter = useAppSelector(selectFilter);
  const dispatch = useDispatch()
  console.log(task);
  console.log(filter);
  return (
    <div>
      <h1>Tasks</h1>
      <div className="flex justify-center p-2">
        <div className="px-4">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger onClick={()=>dispatch(updateFilter("all"))} value="all">All</TabsTrigger>
              <TabsTrigger onClick={()=>dispatch(updateFilter("low"))} value="Low">Low</TabsTrigger>
              <TabsTrigger onClick={()=>dispatch(updateFilter("medium"))} value="Medium">Medium</TabsTrigger>
              <TabsTrigger onClick={()=>dispatch(updateFilter("high"))} value="High">High</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <AddTaskModal />
      </div>
      {task.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}
