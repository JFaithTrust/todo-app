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
                className={"h-full w-full transition-colors bg-neutral-800/50"}>
                {tasks.map((task, index) => {
                    return <Card key={index} task={task} setTasks={setTasks}/>;
                })}

                {/*<AddCard column={} setCards={setCards}/>*/}
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