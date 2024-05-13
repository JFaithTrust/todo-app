'use client'

import Topbar from "@/components/topbar";
import BubbleText from "@/components/bubble/bubble";
import Taskbar from "@/components/taskbar";
import {useEffect, useState} from "react";
import {Toaster} from "@/components/ui/toaster";
import {useDataStore} from "@/context/employee";

export default function Home() {
    const { workers } = useDataStore();
    // const [workerId, setWorkerId] = useState("")

    // useEffect(() => {
    //     if (workers.length > 0){
    //         setWorkerId(workers[0].id)
    //     }
    // }, [workers]);

    return (
        <div className="h-screen w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center container">
            <Toaster />
            <BubbleText />
            {/*<Topbar setWorkerId={setWorkerId} />*/}
            {/*<Taskbar workerId={workerId} />*/}
            <Topbar />
            <Taskbar />
        </div>
  )
}
