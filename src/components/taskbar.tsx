"use client"


import {useState} from "react";
import { Task} from "@/types";
import {Tasks} from "@/constants";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import Card from "@/components/card";

const Taskbar = () => {
    const [tasks, setTasks] = useState<Task[]>(Tasks)

    return (
        <>
            <div
                className={"flex flex-col items-start gap-2 justify-between p-2 text-base font-medium whitespace-nowrap rounded text-violet-500 transition-colors cursor-pointer w-96 border border-violet-400 bg-violet-400/20"}>
                {tasks.map((task, index) => {
                    return <Card key={index} task={task} setTasks={setTasks}/>;
                })}

                <motion.button
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50">
                    <span>Add card</span>
                    <FiPlus/>
                </motion.button>
            </div>
        </>
    )
}

export default Taskbar;