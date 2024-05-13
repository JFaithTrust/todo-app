'use client'

import React, {useEffect, useState} from "react";
import {Employee, Task} from "@/types";
import {id} from "postcss-selector-parser";

interface DataContextType {
    workers: Employee[];
    addWorker: (worker: Employee) => void;
    updateWorker: (id: string, worker: Employee) => void;
    deleteWorker: (id: string) => void;
    workerId: string;
    setWorkerId: (id: string) => void;

    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (taskId: string, task: Task) => void;
    deleteTask: (taskId: string) => void;

    getTasksByWorkerId: (employeeId: string) => Task[];
    getWorkerById: (id: string) => Employee | undefined;
    getTaskById: (id: string) => Task | undefined
}

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export const useDataStore = () => {
    const context = React.useContext(DataContext)
    if (!context) {
        throw new Error('useWorkerStore must be used within a WorkerProvider')
    }
    return context
}

export const DataProvider = ({children}: { children: React.ReactNode }) => {
    const [workers, setWorkers] = useState<Employee[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [workerId, setWorkerId] = useState<string>("");

    useEffect(() => {
        if (workers.length > 0){
            setWorkerId(workers[0].id)
        }
    }, [workers]);

    useEffect(() => {
        const worker = getWorkerById(tasks[tasks.length-1]?.employeeId);
        if(worker){
            worker.totalPoint = 0
            getTasksByWorkerId(worker.id).forEach(task => worker.totalPoint += +task.point)
        }
    }, [tasks]);

    useEffect(() => {
        const workers = localStorage.getItem("workers");
        const tasks = localStorage.getItem("tasks");

        if (workers) {
            setWorkers(JSON.parse(workers));
        }

        if (tasks) {
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
        setTasks(tasks.filter((t) => t.employeeId !== id))
        setWorkerId("")
        localStorage.setItem("tasks", JSON.stringify(tasks.filter((t) => t.employeeId !== id)))
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
        // const tasks = getTasksByWorkerId(id)
        // const worker = workers.find((w) => w.id === id);
        // const sum  = tasks.reduce((acc, task) => acc + +task.point, 0) || 0;
        // return worker ? {...worker, totalPoint: sum} : undefined;
        return workers.find((w) => w.id === id);
    }

    const getTaskById = (id: string) => {
        return tasks.find((t) => t.id === id)
    }

    return (
        <DataContext.Provider value={{
            workers,
            addWorker,
            updateWorker,
            deleteWorker,
            workerId,
            setWorkerId,

            tasks,
            addTask,
            updateTask,
            deleteTask,

            getTasksByWorkerId,
            getWorkerById,
            getTaskById
        }}>
            {children}
        </DataContext.Provider>
    )
}