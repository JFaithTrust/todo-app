export interface Employee {
    id: string
    name: string
    plan: string;
    imageUrl: string
    totalPoint?: string
}

export interface Task {
    id: string
    employeeId: string
    title: string;
    priority: "IMPORTANT" | "NOT_IMPORTANT" | "VERY_IMPORTANT"
    point: string
}