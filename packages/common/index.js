import { object, string } from "yup"

export const formSchema = object({
    username: string()
        .required("Username required")
        .min(6, "Username too short")
        .max(28, "Username too long"),
    password: string()
        .required("Password required")
        .min(6, "Password too short")
        .max(28, "Password too long"),
})