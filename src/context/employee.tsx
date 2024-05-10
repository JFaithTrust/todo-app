// 'use client'
//
// import {Employee} from "@/types";
// import React, {createContext, ReactNode, useEffect, useState} from "react";
// import { v4 as uuidv4 } from 'uuid';
// import {loadWebpackHook} from "next/dist/server/config-utils";
//
// interface WorkerContextType {
//     workers: Employee[]
//     selectedWorker?: Employee
//     createWorker: (worker: Employee) => void
//     updateWorker: (id: string, updatedWorker: Employee) => void
//     deleteWorker: (id: string) => void
//     handleSelectWorker: (id: string) => void
// }
//
// const WorkerContext = createContext<WorkerContextType | undefined>(undefined)
//
// export const useWorkerStore = () => {
//     const context = React.useContext(WorkerContext)
//     if (!context) {
//         throw new Error('useWorkerStore must be used within a WorkerProvider')
//     }
//     return context
// }
//
// interface WorkerProviderProps {
//     children: ReactNode;
// }
//
// export function WorkerProvider({children}: WorkerProviderProps) {
//     const [workers, setWorkers] = React.useState<Employee[]>([])
//     const [selectedWorker, setSelectedWorker] = useState<Employee>()
//
//     useEffect(() => {
//         const getEmployeesFromLocalStorage = async () => {
//             try {
//                 const storedWorkers = localStorage.getItem("workers");
//                 if(storedWorkers){
//                     setWorkers(JSON.parse(storedWorkers) as Employee[]
//                     )
//                 }
//             }catch (e) {
//                 console.log(e)
//             }
//         }
//     }, []);
//
//     const createWorker = (newWorker: Employee) => {
//         setWorkers([...workers, newWorker])
//         localStorage.setItem("workers", JSON.stringify([...workers, newWorker]))
//     }
//
//     const updateWorker = (id: string, updatedWorker: Employee) => {
//         const updatedWorkers = workers.map(worker => {
//             if (worker.id === id) {
//                 return updatedWorker
//             }
//             return worker
//         })
//         setWorkers(updatedWorkers)
//     }
//
//     const deleteWorker = (id: string) => {
//         const updatedWorkers = workers.filter(worker => worker.id !== id)
//         setWorkers(updatedWorkers)
//     }
//
//     const handleSelectWorker = (id: string) => {
//         setSelectedWorker(
//             workers.find((worker) => worker.id === id)
//         )
//     }
//
//     // useEffect(() => {
//     //     const storedWorkers = JSON.parse(localStorage.getItem("workers") || "[]");
//     //     const storedSelectedWorker = JSON.parse(localStorage.getItem("selectedWorker") || "{}");
//     //     setWorkers(storedWorkers);
//     //     setSelectedWorker(storedSelectedWorker);
//     // }, []);
//
//     // useEffect(() => {
//     //     if(!workers){
//     //
//     //     }
//     // }, [workers]);
//
//
//     return (
//         <WorkerContext.Provider value={{workers, selectedWorker, createWorker, updateWorker, deleteWorker, handleSelectWorker}}>
//             {children}
//         </WorkerContext.Provider>
//     )
// }

// import {createContext, useState} from "react";
// import {Employee, Task} from "@/types";
//
// const DataContext = createContext<DataContextType | undefined>(undefined)
//
// interface DataContextType {
//     workers: Employee[]
//     addEmployee: (employee: Employee) => void
//     updateEmployee: (id: string, updatedEmployee: Employee) => void
//     deleteEmployee: (id: string) => void
//     tasks: Task[]
//     addTask: (employeeId: string, task: Task) => void
//     updateTask: (id: string, updatedTask: Task) => void
//     deleteTask: (id: string) => void
// }
//
// export function DataProvider({children}: {children: React.ReactNode}) {
//     const [workers, setWorkers] = useState<Employee[]>([])
//     const [tasks, setTasks] = useState<Task[]>([])
//
//     return(
//         <DataContext.Provider value={{workers}}>
//             {children}
//         </DataContext.Provider>
//     )
// }

