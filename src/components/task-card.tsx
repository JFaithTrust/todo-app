import {Task} from "@/types";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {FiDelete} from "react-icons/fi";
import {RiDeleteBin2Fill} from "react-icons/ri";
import {MdDeleteForever, MdFiberNew} from "react-icons/md";
import {IoMdCreate} from "react-icons/io";
import {TiWarning} from "react-icons/ti";
import {CgDanger} from "react-icons/cg";

interface CardProps {
    task: Task,
}

const TaskCard = ({ task }: CardProps) => {
    return(
        <div className={"flex justify-between"}>
            <div className={"flex items-center"}>
                <div className={`flex items-center gap-x-1.5 w-36 ${
                    task.priority === "VERY_IMPORTANT" ? "text-red-500" :
                        task.priority === "IMPORTANT" ? "text-yellow-500" :
                            "text-green-500"
                }`}>
                    {task.priority === "VERY_IMPORTANT" &&
                        <CgDanger className={"text-red-500 animate-pulse"}/>}
                    {task.priority === "IMPORTANT" && <TiWarning className={"text-yellow-500 animate-pulse"}/>}
                    {task.priority === "NOT_IMPORTANT" && <MdFiberNew className={"text-green-500 animate-pulse"}/>}
                    <div>{task.priority.split('_').join(" ").toLowerCase()}</div>
                </div>
                <span>{task.title}</span>
            </div>
            <div className={"flex items-end gap-x-2"}>
                <div className={"flex flex-col gap-y-[1px]"}>
                    {Array.from({length: 8 - (+task.point / 2)}, (_, i) => (
                        <div key={i} className={"w-2 h-[2.5px] bg-red-500/40"}/>
                    ))}
                    {Array.from({length: +task.point / 2}, (_, i) => (
                            <div key={i} className={"w-2 h-[2.5px] bg-red-500"}/>
                    ))}
                </div>
                <IoMdCreate className={"text-yellow-600 w-5 h-5 hover:animate-bounce cursor-pointer"}/>
                <MdDeleteForever className={"text-red-600 w-5 h-5 hover:animate-bounce cursor-pointer"}/>
            </div>
        </div>
    )
}
export default TaskCard