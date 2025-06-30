import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { deleteTask, toggleCompleteState } from "@/redux/features/counter/task/taskSlice";
import { useAppDispatch } from "@/redux/hook";
import type { iTask } from "@/types";


import { Trash2 } from "lucide-react";

interface IProps {
    task: iTask
};
export default function TaskCard({ task }: IProps) {
    const dispatch = useAppDispatch()
    return (
        <div className="border px-5 py-3 rounded-md container ">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {/* clsx used here  */}
                    <div className={cn("size-3 rounded-full", {
                        "bg-green-500": task.priority === "low",
                        "bg-yellow-500": task.priority === "medium",
                        "bg-red-600": task.priority === "high"
                    })}>

                    </div>
                    <h1 className={cn({"line-through":task.isCompleted})}>{task.title}</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <Button onClick={()=>dispatch(deleteTask(task.id))} variant="link" className="p-0 text-red-500">
                        <Trash2  />
                    </Button>
                    <Button  variant="link" className="p-0 text-red-500">
                     
                    </Button>
                    <Checkbox
                    checked={task.isCompleted}
                    onClick={()=>dispatch(toggleCompleteState(task.id))} />
                </div>
            </div>
            <p className="mt-5">{task.description}</p>
        </div>
    );
}
