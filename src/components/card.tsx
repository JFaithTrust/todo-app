import {Task} from "@/types";

interface CardProps {
    task: Task,
    setTasks: (tasks: Task[]) => void,
}

const Card = ({ task, setTasks }: CardProps) => {
    return(
        <div>{task.title}</div>
    )
}
export default Card