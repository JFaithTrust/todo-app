'use client'

import React, {useEffect, useState} from "react";
import {Employee, Task} from "@/types";

interface DataContextType {
    workers: Employee[];
    addWorker: (worker: Employee) => void;
    updateWorker: (id: string, worker: Employee) => void;
    deleteWorker: (id: string) => void;

    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (taskId: string, task: Task) => void;
    deleteTask: (taskId: string) => void;

    getTasksByWorkerId: (employeeId: string) => Task[];
    getWorkerById: (id: string) => Employee | undefined;
}

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export const useDataStore = () => {
    const context = React.useContext(DataContext)
    if (!context) {
        throw new Error('useWorkerStore must be used within a WorkerProvider')
    }
    return context
}

export const DataProvider= ({children}: {children: React.ReactNode}) => {
    const [workers, setWorkers] = useState<Employee[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    // useEffect(() => {
    //     if (workers){
    //         localStorage.setItem("workers", JSON.stringify(workers));
    //     }
    // }, [workers]);
    //
    // useEffect(() => {
    //     if(tasks){
    //         localStorage.setItem("tasks", JSON.stringify(tasks));
    //     }
    // }, [tasks]);

    useEffect(() => {
        const workers = localStorage.getItem("workers");
        const tasks = localStorage.getItem("tasks");

        if(workers){
            setWorkers(JSON.parse(workers));
        }

        if(tasks){
            setTasks(JSON.parse(tasks));
        }
    }, []);

    const addWorker = (worker: Employee) => {
        setWorkers([...workers, worker]);
        localStorage.setItem("workers", JSON.stringify([...workers, worker]));
    }

    const updateWorker = (id: string, worker: Employee) => {
        setWorkers(workers.map((w) => w.id === id ? worker : w));
        localStorage.setItem("workers", JSON.stringify(workers.map((w) => w.id === id ? worker : w)));
    }

    const deleteWorker = (id: string) => {
        setWorkers(workers.filter((w) => w.id !== id));
        localStorage.setItem("workers", JSON.stringify(workers.filter((w) => w.id !== id)));
    }

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
        localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    }

    const updateTask = (taskId: string, task: Task) => {
        setTasks(tasks.map((t) => t.id === taskId ? task : t));
        localStorage.setItem("tasks", JSON.stringify(tasks.map((t) => t.id === taskId ? task : t)));
    }

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
        localStorage.setItem("tasks", JSON.stringify(tasks.filter((t) => t.id !== taskId)));
    }

    const getTasksByWorkerId = (employeeId: string) => {
        return tasks.filter((t) => t.employeeId === employeeId);
    }

    const getWorkerById = (id: string) => {
        return workers.find((w) => w.id === id);
    }

    return(
        <DataContext.Provider value={{
            workers,
            addWorker,
            updateWorker,
            deleteWorker,

            tasks,
            addTask,
            updateTask,
            deleteTask,

            getTasksByWorkerId,
            getWorkerById
        }}>
            {children}
        </DataContext.Provider>
    )
}