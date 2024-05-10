"use client"

import {motion} from "framer-motion";
import {FiChevronDown, FiDelete} from "react-icons/fi";
import {useEffect, useState} from "react";
import { iconVariants, wrapperVariants} from "@/constants";
import {Employee} from "@/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Option from "@/components/option";
import {Badge} from "@/components/ui/badge";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {MdDeleteForever} from "react-icons/md";
import {FaUserPlus} from "react-icons/fa";
import {IoMdCreate} from "react-icons/io";
import SpringModal from "@/components/ui/spring-modal";
import EditWorkerModal from "@/components/ui/edit-worker-modal";

const Topbar = () => {
    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    // const { workers, handleSelectWorker, selectedWorker } = useWorkerStore()
    const [workers, setWorkers] = useState<Employee[]>([])
    const [selectedWorker, setSelectedWorker] = useState<Employee>()
    const [hasChecked, setHasChecked] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        hasChecked && localStorage.setItem("workers", JSON.stringify(workers))
        hasChecked && setSelectedWorker(workers[0])
    }, [workers]);

    useEffect(() => {
        const userData = localStorage.getItem("workers")
        setWorkers(userData ? JSON.parse(userData) : [])
        setSelectedWorker(userData ? JSON.parse(userData)[0] : undefined)
        setHasChecked(true)
    }, []);

    const handleSelectWorker = (id: string) => {
        const worker = workers.find(worker => worker.id === id)
        setSelectedWorker(worker)
        localStorage.setItem("selectedWorker", JSON.stringify(worker))
        setOpen(false)
    }

    const handleDeleteWorker = (id: string) => {
        const updatedWorkers = workers.filter(worker => worker.id !== id)
        setWorkers(updatedWorkers)
        setSelectedWorker(updatedWorkers[0])
    }

    const handleUpdateWorker = (id: string) => {
       setIsOpen(true)
        setIsEdit(true)
    }

    return (
        <div className="p-8 pb-12 flex items-center justify-center">
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} workers={workers} setWorkers={setWorkers} selectedWorker={selectedWorker} />
            {/*{selectedWorker && <EditWorkerModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} selectedWorker={selectedWorker} setSelectedWorker={setSelectedWorker} workers={workers} setWorkers={setWorkers} />}*/}
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <ContextMenu>
                    <ContextMenuTrigger>
                        {selectedWorker ? (
                            <>
                                <motion.div
                                    onClick={() => setOpen((pv) => !pv)}
                                    className="flex items-center gap-2 justify-between p-2 text-base font-medium whitespace-nowrap rounded text-violet-500 transition-colors cursor-pointer w-96 border border-violet-400 bg-violet-400/20"
                                >
                                    <div className={"flex items-center gap-x-4"}>
                                        <motion.span>
                                            <Avatar>
                                                <AvatarImage
                                                    src={selectedWorker.imageUrl}/>
                                                <AvatarFallback>JS</AvatarFallback>
                                            </Avatar>
                                        </motion.span>
                                        <div className={"flex flex-col items-start gap-x-4"}>
                                            <span>{selectedWorker.plan}</span>
                                            <span>{selectedWorker.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        {selectedWorker.totalPoint && <Badge className={"bg-gray-100 hover:bg-gray-100 border-violet-400 p-1"}>{selectedWorker.totalPoint}</Badge>}
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
                                        <div onClick={() => handleSelectWorker(worker.id)} key={worker.id}
                                             className={"w-96"}>
                                            <Option worker={worker} setOpen={setOpen}/>
                                        </div>
                                    ))}
                                </motion.ul>
                            </>
                        ) : (
                            <div className={"flex items-center gap-2 justify-between p-2 text-base font-medium whitespace-nowrap rounded text-violet-500 transition-colors cursor-pointer border border-violet-400 bg-violet-400/20 w-56"}>
                                <span className={"text-gray-400"}>Users not found</span>
                            </div>
                        )}
                    </ContextMenuTrigger>
                    <ContextMenuContent className="flex flex-col gap-y-1 border-none rounded">
                        <ContextMenuItem className={"flex items-center justify-between"} onClick={() => setIsOpen(true)}>
                            <FaUserPlus className={"w-4 h-4"}/>
                            <span>Create User</span>
                        </ContextMenuItem>
                        {selectedWorker && (
                            <>
                                <ContextMenuItem className={"flex items-center justify-between"} onClick={() => handleUpdateWorker(selectedWorker?.id)}>
                                    <IoMdCreate className={"w-4 h-4"}/>
                                    <span>Update User</span>
                                </ContextMenuItem>
                                <ContextMenuItem className={"flex items-center justify-between text-red-600"} onClick={() => handleDeleteWorker(selectedWorker?.id)}>
                                    <MdDeleteForever className={"w-4 h-4"}/>
                                    <span>Delete User</span>
                                </ContextMenuItem></>
                        )}
                    </ContextMenuContent>
                </ContextMenu>
            </motion.div>
        </div>
    )
}
export default Topbar;