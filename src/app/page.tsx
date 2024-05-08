'use client'

import Topbar from "@/components/topbar";
import BubbleText from "@/components/bubble/bubble";
import Taskbar from "@/components/taskbar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {EmployeeData} from "@/constants/data";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem,
    ContextMenuShortcut, ContextMenuTrigger} from "@/components/ui/context-menu";

export default function Home() {
    const [isDanger, setIsDanger] = useState(false)

  return (
        // <div className="md:h-screen h-full w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center">
        //     <BubbleText />
        //     <Topbar />
        //     <Taskbar />
        // </div>
      <div className="flex flex-col gap-y-8 w-full h-full items-center my-20">
          {EmployeeData.map((worker) =>
              <ContextMenu key={worker.id}>
                  <ContextMenuTrigger>
                      <div key={worker.id} className={`border p-8 rounded-xl w-[900px]`}>
                          <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center justify-between gap-x-6">
                                  <Avatar>
                                      <AvatarImage src={worker.imageUrl} alt={worker.name}/>
                                      <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className={"flex flex-col items-start gap-x-4 text-base"}>
                                      <span>{worker.plan}</span>
                                      <span>{worker.name}</span>
                                  </div>
                              </div>
                              <Badge variant="outline" className={`px-2 py-1`}>{worker.totalPoint}</Badge>
                          </div>
                          <div className="flex flex-col gap-y-4">
                              {worker.tasks.map((task, index) => (
                                  <div key={index}
                                       className="flex items-center justify-between border rounded p-4 relative">
                                      <h3 className={`${
                                          task.priority === "NOT_IMPORTANT" && "font-normal" ||
                                          task.priority === "IMPORTANT" && "font-bold" ||
                                          task.priority === "MUST" && "font-bold text-red-600"
                                      }`}>{task.title}</h3>
                                      <div className={"flex items-start gap-x-2"}>
                                          <Button variant="outline" className="uppercase rounded">сдал</Button>
                                          <Button variant="outline" className="uppercase rounded">принял</Button>
                                      </div>
                                      <Badge className={`rounded-full absolute -right-3 -top-3 px-1.5 py-0.5 bg-gray-20 bg-gray-300
                                `}>{task.point}</Badge>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                      <ContextMenuCheckboxItem checked>
                          Show Bookmarks Bar
                          <ContextMenuShortcut>⌘⇧D</ContextMenuShortcut>
                      </ContextMenuCheckboxItem>
                  </ContextMenuContent>
              </ContextMenu>
          )
          }
      </div>
  )
}
