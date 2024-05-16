import {Task} from "@/types";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {FiDelete} from "react-icons/fi";
import {RiDeleteBin2Fill} from "react-icons/ri";
import {MdDeleteForever, MdFiberNew} from "react-icons/md";
import {IoMdCreate} from "react-icons/io";
import {TiWarning} from "react-icons/ti";
import {CgDanger} from "react-icons/cg";
import {useDataStore} from "@/context/employee";
import {useState} from "react";
import UpdateTaskModal from "@/components/modals/update-task-modal";

interface CardProps {
    task: Task,
    workerId: string
}

const TaskCard = ({task, workerId}: CardProps) => {
    const {getWorkerById, getTaskById, updateWorker} = useDataStore()
    const {deleteTask} = useDataStore();
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)

    const handleDelete = (id: string) => {
        const worker = getWorkerById(workerId)
        const task = getTaskById(id)

        if (worker && task) {
            const sum = worker.totalPoint - +task.point
            const newWorker = {...worker, totalPoint: sum}
            updateWorker(workerId, newWorker)
        }
        deleteTask(id)
    }
    return (
        <div className={"flex justify-between items-center"}>
            <UpdateTaskModal isUpdateOpen={isUpdateOpen} setIsUpdateOpen={setIsUpdateOpen} task={task} />
            <div className={"flex items-center md:gap-x-0 gap-x-1"}>
                <div className={`flex items-center gap-x-1.5 md:w-36 w-fit ${
                    task.priority === "VERY_IMPORTANT" ? "text-red-500" :
                        task.priority === "IMPORTANT" ? "text-yellow-500" :
                            "text-green-500"
                }`}>
                    {task.priority === "VERY_IMPORTANT" &&
                        <CgDanger className={"text-red-500 animate-pulse"}/>}
                    {task.priority === "IMPORTANT" && <TiWarning className={"text-yellow-500 animate-pulse"}/>}
                    {task.priority === "NOT_IMPORTANT" && <MdFiberNew className={"text-green-500 animate-pulse"}/>}
                    <div className={"md:block hidden"}>{task.priority.split('_').join(" ").toLowerCase()}</div>
                </div>
                <span className={"text-wrap sm:text-base text-sm text-ellipsis overflow-hidden"} style={{
                    WebkitLineClamp: 2,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical"
                }}>{task.title}</span>
            </div>
            <div className={"flex items-end gap-x-2"}>
                <Badge className={"px-2 bg-violet-600 border-none rounded md:text-sm text-xs text-white"}>{task.projectName}</Badge>
                <div className={"sm:flex flex-col gap-y-[1px] hidden"}>
                    {Array.from({length: 8 - (+task.point / 2)}, (_, i) => (
                        <div key={i} className={"w-2 h-[2.5px] bg-red-500/40"}/>
                    ))}
                    {Array.from({length: +task.point / 2}, (_, i) => (
                        <div key={i} className={"w-2 h-[2.5px] bg-red-500"}/>
                    ))}
                </div>
                <IoMdCreate
                    onClick={() => setIsUpdateOpen(true)}
                    className={"text-yellow-600 w-5 h-5 hover:animate-bounce cursor-pointer"}/>
                <MdDeleteForever
                    onClick={() => handleDelete(task.id)}
                    className={"text-red-600 w-5 h-5 hover:animate-bounce cursor-pointer"}/>
            </div>
        </div>
    )
}
export default TaskCard