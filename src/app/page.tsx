'use client'

import Topbar from "@/components/topbar";
import BubbleText from "@/components/bubble/bubble";
import Taskbar from "@/components/taskbar";
import {Toaster} from "@/components/ui/toaster";
import {useDataStore} from "@/context/employee";

export default function Home() {
    const { workers } = useDataStore();

    return (
        <div className="h-screen w-full relative flex flex-col items-center justify-center bg-black bg-grid-white/[0.2]">
            <div className={"container"}>
                <Toaster />
                <BubbleText />
                <Topbar />
                <Taskbar />
            </div>
        </div>
  )
}
