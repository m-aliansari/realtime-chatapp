import { io } from "socket.io-client"
import { API_BASE_URL } from "../constants/api.js"

export const socket = new io(API_BASE_URL, {
    autoConnect: false,
    withCredentials: true
})