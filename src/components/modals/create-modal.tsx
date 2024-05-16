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
import {useDataStore} from "@/context/employee";
import {Textarea} from "@/components/ui/textarea";
import Image from "next/image";
import {toast} from "@/components/ui/use-toast";

interface CreateModalProps {
    isCreateOpen: boolean;
    setIsCreateOpen: (open: boolean) => void;
}

const CreateModal = ({ isCreateOpen, setIsCreateOpen }: CreateModalProps) => {
    const [selectedFile, setSelectedFile] = useState("");
    const { addWorker } = useDataStore();


    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: "",
            plan: "",
        },
    })

    const handleFileChange = async (e: SyntheticEvent) => {
        const file = (e.target as HTMLInputElement).files?.[0];

        const allowedTypes = ["image/png","image/svg+xml", "image/jpeg", "image/jpg"]; // Add allowed file types
        const maxSize = 10 * 1024 * 1024; // 10MB maximum file size

        if(file){
            const base64Image = await convertImageToBase64(file);
            // const ImageData = {
            //     name: file.name,
            //     type: file.type,
            //     size: file.size,
            //     base64: base64Image,
            // };
            if (!allowedTypes.includes(file.type)) {
                return toast({
                    title: "Please upload a valid image file!",
                    variant: "destructive",
                });
            }

            if (file.size > maxSize) {
                return toast({
                    title: "Please upload an image file less than 10MB!",
                    variant: "destructive",
                });
            }
            setSelectedFile(base64Image as string);
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

    async function onSubmit(data: z.infer<typeof UserSchema>) {
        const newWorker = {
            id: uuidv4(),
            totalPoint: 0,
            name: data.name,
            plan: data.plan,
            imageUrl: selectedFile
        }
        addWorker(newWorker);
        form.reset()
        setSelectedFile("")
        setIsCreateOpen(false)
    }

    return (
        <AnimatePresence>
            {isCreateOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCreateOpen(false)}
                    className="bg-neutral-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-violet-950 from-40% via-violet-800 via-80% to-violet-500 text-white p-6 rounded-3xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
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
                                                    <Textarea placeholder="Plan"
                                                           className={"bg-transparent rounded"} {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <div
                                        className="flex flex-col bg-mainwhite gap-6 rounded-xl border-[1px] border-solid border-violet-200">
                                        <label
                                            className="cursor-pointer rounded-xl bg-typeyellow font-normal text-mainwhite font-main-text leading-[100%] text-lg">
                                            {!selectedFile ? (
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                             fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="2"
                                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                            className="font-semibold">Click to upload</span></p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG,
                                                            JPG, JPEG (MAX. 10 MB)</p>
                                                    </div>
                                                ) : (
                                                <div className={"h-40 w-full relative"}>
                                                    <Image src={selectedFile} alt="selectedFile" objectFit={"contain"} layout={"fill"} style={{borderRadius: "0.8rem"}}/>
                                                </div>
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
                                            onClick={() => setIsCreateOpen(false)}
                                            className="bg-transparent hover:bg-white/10 border transition-colors text-white font-semibold w-full py-2 rounded"
                                        >
                                            Close
                                        </button>
                                        <button
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

export default CreateModal;