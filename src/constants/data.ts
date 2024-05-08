interface Emp {
    id: string;
    name: string;
    plan: string,
    imageUrl: string;
    totalPoint: number
    tasks: TJob[]
}

interface TJob {
    title: string;
    point: number;
    priority: "IMPORTANT" | "NOT_IMPORTANT" | "MUST"
}


export const EmployeeData: Emp[] = [
    {
        id: "1",
        name: "Jahongir Solijoniy",
        plan: "Hедельное расписание с 29 апреля по 3 мая",
        imageUrl: "url",
        totalPoint: 8,
        tasks: [
            {
                title: "Task1",
                point: 4,
                priority: "NOT_IMPORTANT",
            },
            {
                title: "Task2",
                point: 8,
                priority: "IMPORTANT",
            },
            {
                title: "Task3",
                point: 11,
                priority: "MUST",
            },
            {
                title: "Task4",
                point: 15,
                priority: "MUST",
            },
        ]
    },
    {
        id: "2",
        name: "Roberto Carlos",
        plan: "Hедельное расписание с 29 апреля по 3 мая",
        imageUrl: "url",
        totalPoint: 15,
        tasks: [
            {
                title: "Task1",
                point: 5,
                priority: "NOT_IMPORTANT",
            },
            {
                title: "Task2",
                point: 8,
                priority: "IMPORTANT",
            },
            {
                title: "Task3",
                point: 10,
                priority: "MUST",
            },
            {
                title: "Task4",
                point: 10,
                priority: "MUST",
            },
        ]
    },
    {
        id: "3",
        name: "Andrew Mason",
        plan: "Hедельное расписание с 29 апреля по 3 мая",
        imageUrl: "url",
        totalPoint: 26,
        tasks: [
            {
                title: "Task1",
                point: 5,
                priority: "NOT_IMPORTANT",
            },
            {
                title: "Task2",
                point: 8,
                priority: "IMPORTANT",
            },
            {
                title: "Task3",
                point: 10,
                priority: "MUST",
            },
            {
                title: "Task4",
                point: 10,
                priority: "MUST",
            },
        ]
    },
    {
        id: "4",
        name: "John Doe",
        plan: "Hедельное расписание с 29 апреля по 3 мая",
        imageUrl: "url",
        totalPoint: 40,
        tasks: [
            {
                title: "Task1",
                point: 5,
                priority: "NOT_IMPORTANT",
            },
            {
                title: "Task2",
                point: 8,
                priority: "IMPORTANT",
            },
            {
                title: "Task3",
                point: 10,
                priority: "MUST",
            },
            {
                title: "Task4",
                point: 10,
                priority: "MUST",
            },
        ]
    },
]