import Topbar from "@/components/topbar";
import BubbleText from "@/components/bubble/bubble";
import Taskbar from "@/components/taskbar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {EmployeeData} from "@/constants/data";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default function Home() {

  return (
        // <div className="md:h-screen h-full w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center">
        //     <BubbleText />
        //     <Topbar />
        //     <Taskbar />
        // </div>
      <div className="flex flex-col gap-y-8 w-full h-full items-center my-20">
          {EmployeeData.map((worker) =>
                <div key={worker.id} className={`border p-8 rounded-xl 
                            ${
                                worker.totalPoint >= 1 && worker.totalPoint <= 10 && "bg-sky-400" ||
                                worker.totalPoint >= 10 && worker.totalPoint <= 25 && "bg-indigo-600" ||
                                worker.totalPoint >= 25 && worker.totalPoint <= 35 && "bg-violet-600" ||
                                worker.totalPoint > 35 && "bg-red-600"
                            }
                        `}>
                    <div className="flex items-center justify-between gap-x-4 mb-4">
                        <Avatar>
                            <AvatarImage src={worker.imageUrl} alt={worker.name} />
                            <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={"flex flex-col items-start gap-x-4 text-sm"}>
                            <span>{worker.plan}</span>
                            <span>{worker.name}</span>
                        </div>
                        <Badge variant="outline" className={`px-2 py-1`}>{worker.totalPoint}</Badge>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        {worker.tasks.map((task, index) =>(
                            <div key={index} className="flex items-center justify-between border rounded p-4 relative">
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
          )
          }
      </div>
  )
}
