"use client"

import {motion} from "framer-motion";
import {FiChevronDown, FiDelete} from "react-icons/fi";
import { iconVariants, wrapperVariants} from "@/constants";
import {Employee} from "@/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Option from "@/components/option";
import {Badge} from "@/components/ui/badge";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {MdDeleteForever} from "react-icons/md";
import {IoMdCreate} from "react-icons/io";
import CreateModal from "@/components/modals/create-modal";
import {useEffect, useState} from "react";
import {useDataStore} from "@/context/employee";
import UpdateModal from "@/components/modals/update-modal";
import {Plus} from "lucide-react";

interface TopbarProps {
    setWorkerId: (id: string) => void;
}

const Topbar = ({setWorkerId}: TopbarProps) => {
    const [open, setOpen] = useState(false)
    const { getWorkerById, workers, deleteWorker } = useDataStore()
    const [selectedWorker, setSelectedWorker] = useState<Employee>()

    // modals state
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)

    useEffect(() => {
        const worker = workers[0]
        setSelectedWorker(worker)
    }, [workers]);

    const handleSelectWorker = (id: string) => {
        const worker = getWorkerById(id)
        setSelectedWorker(worker)
        setWorkerId(id)
        setOpen(false)
    }

    const handleDeleteWorker = (id: string) => {
        deleteWorker(id)
        setSelectedWorker(workers[0])
        setWorkerId(workers[0].id)
    }

    return (
        <div className="p-8 pb-12 flex items-center justify-center">
            <CreateModal isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} />
            <UpdateModal isUpdateOpen={isUpdateOpen} setIsUpdateOpen={setIsUpdateOpen} worker={selectedWorker} />
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <div
                    onClick={() => setIsCreateOpen(true)}
                    className={"flex items-center gap-2 justify-between p-2 text-base font-medium whitespace-nowrap rounded transition-colors cursor-pointer border border-violet-400 bg-violet-400/20 w-96 text-gray-400 mb-2"}>
                    <span className={""}>Create User</span>
                    <Plus className={"w-6 h-6 border border-gray-400 rounded"}/>
                </div>
                {selectedWorker && (
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <motion.div
                                onClick={() => setOpen((pv) => !pv)}
                                className="flex items-center gap-2 justify-between p-2 text-base font-medium whitespace-nowrap rounded text-violet-500 transition-colors cursor-pointer w-96 border border-violet-400 bg-violet-400/20"
                            >
                                <div className={"flex items-center gap-x-4"}>
                                    <motion.span>
                                        <Avatar>
                                            <AvatarImage
                                                src={selectedWorker?.imageUrl}/>
                                            <AvatarFallback>JS</AvatarFallback>
                                        </Avatar>
                                    </motion.span>
                                    <div className={"flex flex-col items-start gap-x-4"}>
                                        <span>{selectedWorker?.plan}</span>
                                        <span>{selectedWorker?.name}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    {selectedWorker?.totalPoint && <Badge
                                        className={"bg-gray-100 hover:bg-gray-100 border-violet-400 p-1"}>{selectedWorker.totalPoint}</Badge>}
                                    <motion.span variants={iconVariants}>
                                        <FiChevronDown/>
                                    </motion.span>
                                </div>
                            </motion.div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="flex flex-col gap-y-1 border-none rounded">
                            {selectedWorker && (
                                <>
                                    <ContextMenuItem className={"flex items-center justify-between"}
                                                     onClick={() => setIsUpdateOpen(true)}>
                                        <IoMdCreate className={"w-4 h-4"}/>
                                        <span>Update User</span>
                                    </ContextMenuItem>
                                    <ContextMenuItem className={"flex items-center justify-between text-red-600"}
                                                     onClick={() => handleDeleteWorker(selectedWorker?.id)}>
                                        <MdDeleteForever className={"w-4 h-4"}/>
                                        <span>Delete User</span>
                                    </ContextMenuItem></>
                            )}
                        </ContextMenuContent>
                    </ContextMenu>
                )}
                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{originY: "top", translateX: "-50%"}}
                    className="flex flex-col gap-2 p-2 rounded shadow-xl absolute top-[105%] left-[50%] w-96 overflow-hidden bg-violet-800 z-10"
                >
                    {workers.map(worker => (
                        <div onClick={() => handleSelectWorker(worker.id)} key={worker.id}
                             className={"w-96"}>
                            <Option worker={worker} setOpen={setOpen}/>
                        </div>
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    )
}
export default Topbar;