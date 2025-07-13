import { object, string } from "yup"

export const authFormSchema = object({
    username: string()
        .required("Username required")
        .min(6, "Username too short")
        .max(28, "Username too long"),
    password: string()
        .required("Password required")
        .min(6, "Password too short")
        .max(28, "Password too long"),
})

export const appName = 'realtime-chatapp'

export const friendFormSchema = authFormSchema.omit(['password'])

export const SOCKET_EVENTS = {
    ADD_FRIEND: "add_friend",
    FRIENDS_LIST: "friends_list"
}