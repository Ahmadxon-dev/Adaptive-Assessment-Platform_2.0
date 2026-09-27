import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, {message: "Ism kamida 3 ta belgidan iborat bo'lishi kerak"}),
    email: z.email({message: "Email xato kiritildi"}),
    password: z.string().min(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" }),
})

export const loginSchema = z.object({
    email: z.email({message: "Email xato kiritildi"}),
    password: z.string().min(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" }),
})