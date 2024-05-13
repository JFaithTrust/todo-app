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

interface CreateModalProps {
    isCreateOpen: boolean;
    setIsCreateOpen: (open: boolean) => void;
    // workerId?: string;
}

const CreateTaskModal = ({isCreateOpen, setIsCreateOpen}: CreateModalProps) => {
    const {addTask, updateWorker, getWorkerById, workerId, getTasksByWorkerId} = useDataStore();


    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            title: "",
            point: "",
            priority: "NOT_IMPORTANT",
        },
    })

    function onSubmit(data: z.infer<typeof TaskSchema>) {
        const newTask = {
            id: uuidv4(),
            employeeId: workerId,
            title: data.title,
            point: data.point,
            priority: data.priority,
        }
        addTask(newTask)

        const worker = getWorkerById(workerId)
        if (worker) {
            const sum = getTasksByWorkerId(workerId).reduce((n, {point}) => n + +point, 0)
            const newWorker = {
                ...worker,
                totalPoint: sum
            }
            updateWorker(workerId, newWorker)
        }
        form.reset()
        setIsCreateOpen(false)
    }

    return (
        <AnimatePresence>
            {isCreateOpen && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={() => setIsCreateOpen(false)}
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
                                            onClick={() => setIsCreateOpen(false)}
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

export default CreateTaskModal;