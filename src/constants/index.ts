import {Employee, Task} from "@/types";

export const Employees: Employee[]   = [
    {
        id: '1',
        name: "Jahongir Solijoniy",
        plan: "Weekly schedule April 29th to May 3",
        totalPoint: 70,
        imageUrl: 'https://unsplash.com/photos/man-in-white-crew-neck-t-shirt-a6PMA5JEmWE',
    },
    {
        id: '2',
        name: "John Doe",
        plan: "Weekly schedule April 19th to April 26",
        totalPoint: 60,
        imageUrl: 'https://unsplash.com/photos/grayscale-photo-of-man-XHVpWcr5grQ',
    },
    {
        id: '3',
        name: "Roberto Carlos",
        plan: "Weekly schedule April 1th to April 7",
        totalPoint: 60,
        imageUrl: 'https://unsplash.com/@usmanyousaf',
    },
]

export const Tasks: Task[] = [
    {
        employeeId: '1',
        title: "Task1",
        priority: "IMPORTANT",
        point: 40,
    },
    {
        employeeId: '1',
        title: "Task12",
        priority: "NOT_IMPORTANT",
        point: 20,
    },
    {
        employeeId: '1',
        title: "Task3",
        priority: "ANY_TYPE",
        point: 10,
    },
    {
        employeeId: '2',
        title: "Task3",
        priority: "ANY_TYPE",
        point: 10,
    },
    {
        employeeId: '2',
        title: "Task3",
        priority: "ANY_TYPE",
        point: 10,
    },
    {
        employeeId: '3',
        title: "Task3",
        priority: "ANY_TYPE",
        point: 10,
    },
]


export const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

export const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

export const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

export const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};