import {z} from "zod";

export const UserSchema = z.object({
    name: z.string().min(3),
    plan: z.string().min(3),
})

export const TaskSchema = z.object({
    title: z.string().min(3),
    priority: z.enum(["IMPORTANT", "NOT_IMPORTANT", "VERY_IMPORTANT"]),
    point: z.string().min(1).max(16).regex(/^\d+$/),
})