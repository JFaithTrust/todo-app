'use client'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {useDataStore} from "@/context/employee";

const PrintPage = () => {
    const {workers, getTasksByWorkerId } = useDataStore()

    return (
        <div className="flex flex-col gap-y-8 w-full h-full items-center my-20">
            {workers.map((worker) =>
                        <div key={worker.id} className={`border p-8 rounded-xl w-[900px]`}>
                            <div
                                className="flex items-center justify-between mb-4 bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] px-5 py-2 rounded-xl">
                                <div className="flex items-center justify-between gap-x-6">
                                    <Avatar>
                                        <AvatarImage src={worker.imageUrl} alt={worker.name} className={"w-20 h-20"}/>
                                        <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className={"flex flex-col items-start gap-x-4 text-xl font-bold"}>
                                        <span className={"truncate"}>{worker.plan}</span>
                                        <span className={"truncate"}>{worker.name}</span>
                                    </div>
                                </div>
                                {/*<Badge variant="outline" className={`px-2 py-1`}>{worker.totalPoint}</Badge>*/}
                                <div className={"flex flex-col items-center font-rubik font-normal"}>
                                    <img src={'https://cloud.leerybit.uz/apps/theming/image/logo?v=41'} alt={'logo'}
                                         className={"w-16 h-16 rounded-full"}
                                        />
                                    <h1 className={"text-3xl"}>Leerybit</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                {getTasksByWorkerId(worker.id).map((task, index) => (
                                    <div key={index}
                                         className="flex items-center justify-between border rounded p-4 relative">
                                        <div className={'flex items-center gap-x-3'}>
                                            <div className={"flex flex-col gap-y-[1px]"}>
                                                {Array.from({length: 8 - (+task.point / 2)}, (_, i) => (
                                                    <div key={i} className={"w-2 h-[2.5px] bg-blue-500/40"}/>
                                                ))}
                                                {Array.from({length: +task.point / 2}, (_, i) => (
                                                    <div key={i} className={"w-2 h-[2.5px] bg-blue-500"}/>
                                                ))}
                                            </div>
                                            <div className={"flex gap-x-2"}>
                                                {task.projectName && <Badge
                                                    className={"px-1 py-0.5 bg-violet-600 border-none rounded text-[10px] text-white w-fit"}>{task.projectName}</Badge>}
                                                    <h3 className={`${
                                                        task.priority === "NOT_IMPORTANT" && "font-normal" ||
                                                        task.priority === "IMPORTANT" && "font-bold" ||
                                                        task.priority === "VERY_IMPORTANT" && "font-bold text-red-600"
                                                    }`}>{task.title}</h3>
                                            </div>
                                        </div>
                                        <div className={"flex items-center gap-x-2"}>
                                            <div className={"text-gray-400 border px-4 py-1 rounded uppercase"}>
                                                сдал
                                            </div>
                                            <div className={"text-gray-400 border px-4 py-1 rounded uppercase"}>
                                                принял
                                            </div>
                                        </div>
                                        {/*        <Badge className={`rounded-full absolute -right-3 -top-3 px-1.5 py-0.5 bg-gray-20 bg-gray-300*/}
                                        {/*`}>{task.point}</Badge>*/}
                                    </div>
                                ))}
                            </div>
                        </div>
            )
            }
        </div>
    )
}
export default PrintPage;