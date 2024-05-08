export interface Employee {
    id: string
    name: string
    plan: string;
    imageUrl: string
    totalPoint: number
}

export interface Task {
    employeeId: string
    title: string;
    priority: "IMPORTANT" | "NOT_IMPORTANT" | "ANY_TYPE"
    point: number
}