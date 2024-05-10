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
import {v4 as uuidv4} from "uuid";

interface SpringModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    workers: Employee[];
    setWorkers: (workers: Employee[]) => void;
    selectedWorker: Employee | undefined
}

const SpringModal = ({ isOpen, setIsOpen, workers, setWorkers, selectedWorker }: SpringModalProps) => {
    const [selectedFile, setSelectedFile] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("")


    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: selectedWorker ? selectedWorker.name : "",
            plan: selectedWorker ? selectedWorker.plan : "",
        },
    })

    const handleFileChange = async (e: SyntheticEvent) => {
        // const target = e.target as HTMLInputElement;
        // const file: File = (target.files as FileList)[0];
        //
        // // Validate file type and size
        // const allowedTypes = ["image/png","image/svg+xml", "image/jpeg"]; // Add allowed file types
        // const maxSize = 10 * 1024 * 1024; // 10MB maximum file size
        //
        // if (!allowedTypes.includes(file.type)) {
        //     return toast({
        //         title: "Fayl turi noto'g'ri! Iltimos pdf formatda yuklang.",
        //         variant: "destructive",
        //     });
        // }
        //
        // if (file.size > maxSize) {
        //     return toast({
        //         title: "Fayl hajmi 10MB dan oshmasligi kerak!",
        //         variant: "destructive",
        //     });
        // }
        //
        // setSelectedFile(file.name);
        // const formData = new FormData();
        // formData.append("file", file);

        const file = (e.target as HTMLInputElement).files?.[0];

        if(file){
            const base64Image = await convertImageToBase64(file);
            const ImageData = {
                name: file.name,
                type: file.type,
                size: file.size,
                base64: base64Image,
            };
            setSelectedFile(base64Image as string);
            setSelectedFileName(file.name);
        }
    };

    const convertImageToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    function onSubmit(data: z.infer<typeof UserSchema>) {
        const newWorker = {
            id: uuidv4(),
            name: data.name,
            plan: data.plan,
            imageUrl: selectedFile
        }
        if(selectedWorker){
            const updatedWorkers = workers.map(worker => worker.id === selectedWorker.id ? newWorker : worker)
            setWorkers(updatedWorkers)
            localStorage.setItem("workers", JSON.stringify(updatedWorkers))
        }else {
            setWorkers( [...workers, newWorker]);
            localStorage.setItem("workers", JSON.stringify([...workers, newWorker]));
            form.reset()
        }
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
                                                           className={"bg-transparent rounded"} {...field}/>
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
                                                           className={"bg-transparent rounded"} {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <div
                                        className="flex flex-col p-[18px] bg-mainwhite gap-6 rounded-xl border-[1px] border-solid border-violet-200">
                                        <h3 className="text-center text-sm leading-[100%] font-normal font-main-text">
                                            {selectedFile ? `Tanlangan fayl` : "Fayl yuklash"}
                                        </h3>
                                        <label
                                            className="cursor-pointer rounded-xl bg-typeyellow py-[12px] px-[48px] font-normal text-mainwhite font-main-text leading-[100%] text-lg">
                                            {!selectedFileName ? (
                                                "Yuklash"
                                            ) : (
                                                `${selectedFileName}`
                                            )}
                                            <Input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
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

export default SpringModal;