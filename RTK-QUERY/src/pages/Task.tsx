import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddTaskModal } from "@/module/tasks/AddTaskModal"

import TaskCard from "@/module/tasks/TaskCard"

import { useGetTaskQuery } from "@/redux/api/baseApi"
import type { ITask } from "@/types"





export default function Task() {

    const { data, isLoading, isError } = useGetTaskQuery(undefined)
    // const { data, isLoading, isError } = useGetTaskQuery(undefined,{
    //     pollingInterval:30000,
    //     refetchOnFocus:true,
    //     refetchOnMountOrArgChange:true,
    //     refetchOnReconnect:true
    // })

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
                {!isLoading && data.tasks.map((task: ITask) => (<TaskCard task={task} key={task.id} />))}
            </div>

        </div>
    )
}