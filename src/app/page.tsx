'use client'

import Topbar from "@/components/topbar";
import BubbleText from "@/components/bubble/bubble";
import Taskbar from "@/components/taskbar";
import {useState} from "react";
import {Toaster} from "@/components/ui/toaster";

export default function Home() {
    const [workerId, setWorkerId] = useState("")

  return (
        <div className="h-screen w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center container">
            <Toaster />
            <BubbleText />
            <Topbar setWorkerId={setWorkerId} />
            <Taskbar workerId={workerId} />
        </div>
  )
}
