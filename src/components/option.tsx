import {motion} from "framer-motion";
import {actionIconVariants, iconVariants, itemVariants} from "@/constants";
import {Employee} from "@/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {FiChevronDown} from "react-icons/fi";

interface OptionProps {
    worker: Employee
    setOpen: (open: boolean) => void
}


const Option = ({ worker, setOpen }: OptionProps) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded text-violet-400 transition-colors cursor-pointer justify-between pr-6 bg-transparent hover:bg-violet-400/20"
        >
            <div className={"flex items-center gap-x-4"}>
                <motion.span variants={actionIconVariants}>
                    <Avatar>
                        <AvatarImage
                            src={worker?.imageUrl} className={"w-10 h-10"} />
                        <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </motion.span>
                <div className={"flex flex-col items-start gap-x-4"}>
                    <span>{worker.plan}</span>
                    <span>{worker.name}</span>
                </div>
            </div>
            {worker.totalPoint > 0 && <Badge className={"bg-gray-100 hover:bg-gray-100 border-violet-400 px-2 py-1"}>{worker.totalPoint}</Badge> }
        </motion.li>
    );
};

export default Option;