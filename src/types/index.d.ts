export interface Employee {
    id: string
    name: string
    plan: string;
    imageUrl: string
    totalPoint : number
}

export interface Task {
    id: string
    employeeId: string
    title: string;
    priority: "IMPORTANT" | "NOT_IMPORTANT" | "VERY_IMPORTANT"
    point: string
    projectName: string
}