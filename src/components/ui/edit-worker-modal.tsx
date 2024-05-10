"use client";

import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {Employee} from "@/types";
import {UserSchema} from "@/validation";
import {SyntheticEvent, useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {useWorkerStore} from "@/context/employee";
import {v4 as uuidv4} from "uuid";

interface SpringModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selectedWorker: Employee;
    setSelectedWorker: (worker: Employee) => void;
    workers: Employee[];
    setWorkers: (workers: Employee[]) => void;
}

const EditWorkerModal = ({ isOpen, setIsOpen, selectedWorker, setSelectedWorker, workers, setWorkers }: SpringModalProps) => {

    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: selectedWorker?.name,
            plan: selectedWorker?.plan,
        },
    })

    function onSubmit(data: z.infer<typeof UserSchema>) {
        const newWorker = {
            id: uuidv4(),
            name: data.name,
            plan: data.plan,
            imageUrl: selectedWorker.imageUrl,
        }
        const updatedWorkers = workers.map(worker => worker.id === selectedWorker.id ? newWorker : worker)
        setSelectedWorker(newWorker)
        setWorkers(updatedWorkers)
        form.reset()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-neutral-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-black to-neutral-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <div className="relative z-10 w-full">
                            <h3 className="text-3xl font-bold text-center mb-2">
                                Create User
                            </h3>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name"
                                                           className={"bg-transparent rounded"} {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="plan"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Plan</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Plan"
                                                           className={"bg-transparent rounded"} {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type={"button"}
                                            onClick={() => setIsOpen(false)}
                                            className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(false)}
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

export default EditWorkerModal;