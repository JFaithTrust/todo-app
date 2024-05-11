"use client"


import {useEffect, useState} from "react";
import { Task} from "@/types";
import {Tasks} from "@/constants";
import {motion, Reorder} from "framer-motion";
import { FiPlus } from "react-icons/fi";
import TaskCard from "@/components/task-card";
import {useDataStore} from "@/context/employee";
import {Plus} from "lucide-react";
import CreateTaskModal from "@/components/modals/create-task-modal";

const Taskbar = ({workerId}: {workerId ?: string}) => {
    const { getTasksByWorkerId } = useDataStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [tasks, setTasks] = useState<Task[]>([])


    useEffect(() => {
        setTasks(getTasksByWorkerId(workerId || ""));
    }, [workerId]);

    return (
        <>
            <motion.button
                onClick={() => setIsCreateOpen(true)}
                className={"flex items-center gap-2 justify-between p-2 text-base font-medium whitespace-nowrap rounded transition-colors cursor-pointer border border-violet-400 bg-violet-400/20 text-gray-400 container"}>
                <span className={""}>Create Task</span>
                <Plus className={"w-6 h-6 border border-gray-400 rounded"}/>
            </motion.button>
            <CreateTaskModal isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} workerId={workerId}/>
            {tasks.length > 0 && (
                <div
                    className={"flex flex-col gap-y-2 items-start gap-2 justify-between text-base font-medium whitespace-nowrap rounded text-violet-500 transition-colors cursor-pointer border border-violet-400 bg-violet-400/20 mt-2 w-full"}>
                    <Reorder.Group values={tasks} onReorder={setTasks} axis="y" className={"w-full cursor-grabbing"}>
                        {tasks.map((task, index) =>
                            <Reorder.Item key={task.id} value={task}>
                                <div key={index}
                                     className={"bg-transparent hover:bg-violet-500/20 w-full h-full p-2 active:bg-violet-500/20"}>
                                    <TaskCard task={task}/>
                                </div>
                            </Reorder.Item>
                        )}
                    </Reorder.Group>
                </div>
            )}
        </>
    )
}

export default Taskbar;