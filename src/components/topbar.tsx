"use client"

import {motion} from "framer-motion";
import {FiChevronDown} from "react-icons/fi";
import {useState} from "react";
import { Employees, iconVariants, wrapperVariants} from "@/constants";
import {Employee} from "@/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Option from "@/components/option";
import {Badge} from "@/components/ui/badge";

const Topbar = () => {
    const [open, setOpen] = useState(false)
    const [workers, setWorkers] = useState<Employee[]>(Employees)
    const [selectedWorker, setSelectedWorker] = useState<Employee>(Employees[0])

    const handleSelectWorker = (id: string) => {
        setSelectedWorker(
            workers.find((worker) => worker.id === id)
        )
    }

    return (
        <div className="p-8 pb-12 flex items-center justify-center">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <motion.div
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center gap-2 justify-between p-2 text-base font-medium whitespace-nowrap rounded text-violet-500 transition-colors cursor-pointer w-full border border-violet-400 bg-violet-400/20"
                >
                    <div className={"flex items-center gap-x-4"}>
                        <motion.span>
                            <Avatar>
                                <AvatarImage
                                    src="https://unsplash.com/photos/man-in-white-crew-neck-t-shirt-a6PMA5JEmWE"/>
                                <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                        </motion.span>
                        <div className={"flex flex-col items-start gap-x-4"}>
                            <span>{selectedWorker.plan}</span>
                            <span>{selectedWorker.name}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Badge className={"bg-transparent hover:bg-transparent border-violet-400"}>{selectedWorker.totalPoint}</Badge>
                        <motion.span variants={iconVariants}>
                            <FiChevronDown/>
                        </motion.span>
                    </div>
                </motion.div>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{originY: "top", translateX: "-50%"}}
                    className="flex flex-col gap-2 p-2 rounded shadow-xl absolute top-[120%] left-[50%] w-96 overflow-hidden bg-violet-800"
                >
                    {workers.map(worker => (
                        <div onClick={() => handleSelectWorker(worker.id)} key={worker.id} className={"w-96"}>
                            <Option worker={worker} setOpen={setOpen} />
                        </div>
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    )
}
export default Topbar;