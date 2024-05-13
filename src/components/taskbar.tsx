"use client"


import {useEffect, useState} from "react";
import {Task} from "@/types";
import {motion, Reorder} from "framer-motion";
import TaskCard from "@/components/task-card";
import {useDataStore} from "@/context/employee";
import {Plus} from "lucide-react";
import CreateTaskModal from "@/components/modals/create-task-modal";

const Taskbar = () => {
    const {getTasksByWorkerId, tasks, workerId} = useDataStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([])

    // useEffect(() => {
    //     setSelectedTasks(getTasksByWorkerId(workerId));
    // }, []);

    useEffect(() => {
        setSelectedTasks(
            getTasksByWorkerId(workerId)
        )
    }, [workerId, tasks]);

    // useEffect(() => {
    //     setTasks(getTasksByWorkerId(workerId));
    // }, [workerId]);
    //
    // useEffect(() => {
    //     const tasks = localStorage.getItem("tasks");
    //     if (tasks) {
    //         const checkIfTaskExists = JSON.parse(tasks).find((task: Task) => task.employeeId === workerId);
    //         setTasks(checkIfTaskExists);
    //     }
    // }, []);

    if (workerId === "") {
        return (
            <div className={"flex items-center justify-center gap-2"}>
                <span className={"text-lg font-medium text-violet-500"}>Please select a worker to view tasks</span>
            </div>
        )
    } else {
        return (
            <>
                <motion.button
                    onClick={() => setIsCreateOpen(true)}
                    className={"flex items-center gap-2 justify-between p-2 text-base font-medium whitespace-nowrap rounded transition-colors cursor-pointer border border-violet-400 bg-violet-400/20 text-gray-400 container"}>
                    <span className={""}>Create Task</span>
                    <Plus className={"w-6 h-6 border border-gray-400 rounded"}/>
                </motion.button>
                <CreateTaskModal isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen}/>
                {selectedTasks.length > 0 && (
                    <div
                        className={"flex flex-col gap-y-2 items-start gap-2 justify-between text-base font-medium whitespace-nowrap rounded text-violet-500 transition-colors cursor-pointer border border-violet-400 bg-violet-400/20 mt-2 w-full"}>
                        <Reorder.Group values={selectedTasks} onReorder={setSelectedTasks} axis="y"
                                       className={"w-full cursor-grabbing"}>
                            {selectedTasks.map((task, index) =>
                                <Reorder.Item key={task.id} value={task}>
                                    <div key={index}
                                         className={"bg-transparent hover:bg-violet-500/20 w-full h-full p-2 active:bg-violet-500/20"}>
                                        <TaskCard task={task} workerId={workerId} />
                                    </div>
                                </Reorder.Item>
                            )}
                        </Reorder.Group>
                    </div>
                )}
            </>
        )
    }
}

export default Taskbar;