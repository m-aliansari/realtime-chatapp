import { CLIENT_BASE_URL } from "./client.js"

export const corsConfig = {
    origin: CLIENT_BASE_URL,
    credentials: true
}