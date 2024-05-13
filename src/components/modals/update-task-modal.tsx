"use client";

import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {TaskSchema} from "@/validation";
import {v4 as uuidv4} from "uuid";
import {useDataStore} from "@/context/employee";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Task} from "@/types";
import {useEffect} from "react";

interface UpdateTaskModalProps {
    isUpdateOpen: boolean;
    setIsUpdateOpen: (open: boolean) => void;
    task: Task;
    // workerId: string
}

const UpdateTaskModal = ({isUpdateOpen, setIsUpdateOpen, task}: UpdateTaskModalProps) => {
    const {updateTask, getWorkerById, updateWorker, getTasksByWorkerId, workerId} = useDataStore();

    useEffect(() => {
        form.setValue("title", task.title)
        form.setValue("point", task.point)
        form.setValue("priority", task.priority)
    }, [task]);

    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            title: task.title,
            point: task.point,
            priority: task.priority,
        },
    });

    function onSubmit(data: z.infer<typeof TaskSchema>) {
        const newTask = {
            id: task.id,
            employeeId: task.employeeId,
            title: data.title,
            point: data.point,
            priority: data.priority,
        }

        updateTask(task.id, newTask);
        const worker = getWorkerById(workerId)
        const sum = getTasksByWorkerId(workerId).reduce((n, {point}) => n + +point, 0)
        // sum tasks point
        // getTasksByWorkerId(workerId).reduce((acc, task) => acc + +task.point, 0)
        if (worker) {
            const newWorker = {...worker, totalPoint: sum}
            updateWorker(workerId, newWorker)
        }
        form.reset()
        setIsUpdateOpen(false)
    }

    return (
        <AnimatePresence>
            {isUpdateOpen && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={() => setIsUpdateOpen(false)}
                    className="bg-neutral-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{scale: 0, rotate: "12.5deg"}}
                        animate={{scale: 1, rotate: "0deg"}}
                        exit={{scale: 0, rotate: "0deg"}}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-violet-950 from-40% via-violet-800 via-80% to-violet-500 text-white p-6 rounded-3xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <div className="relative z-10 w-full">
                            <h3 className="text-3xl font-bold text-center mb-2">
                                Create Task
                            </h3>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name"
                                                           className={"bg-transparent rounded"} {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="point"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Min 0, Max 16" type={"number"} min={0} max={16}
                                                           step={1}
                                                           className={"bg-transparent rounded"} {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Point</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className={"bg-transparent rounded"}>
                                                            <SelectValue placeholder={"Select priority"}/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className={"bg-gray-100 rounded"}>
                                                        <SelectItem value={"NOT_IMPORTANT"}>Not Important</SelectItem>
                                                        <SelectItem value={"IMPORTANT"}>Important</SelectItem>
                                                        <SelectItem value={"VERY_IMPORTANT"}>Very Important</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type={"button"}
                                            onClick={() => setIsUpdateOpen(false)}
                                            className="bg-transparent hover:bg-white/10 border transition-colors text-white font-semibold w-full py-2 rounded"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type={"submit"}
                                            className="bg-white hover:opacity-90 transition-opacity text-black font-semibold w-full py-2 rounded"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UpdateTaskModal;