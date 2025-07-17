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

export const messageFormSchema = object({
    message: string().required("Message required").max(255, "Max length is 255")
})

export const SOCKET_EVENTS = {
    ADD_FRIEND: "add_friend",
    FRIENDS_LIST: "friends_list",
    DISCONNECT: "disconnecting",
    CONNECT: "connect",
    CONNECTION_STATUS_CHANGED: "connection_status_changed",
    MESSAGES: "messages",
    CONNECTION_ERROR: "connect_error",
    DIRECT_MESSAGE: "direct_message",
    FRIEND_ADDED: "friend_added",
    NEW_MESSAGE_ID: "new_message_id",
    TYPING: "typing",
    STOP_TYPING: "stop_typing"
}