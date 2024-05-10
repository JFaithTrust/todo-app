import {z} from "zod";

export const UserSchema = z.object({
    name: z.string().min(3),
    plan: z.string().min(3),
})