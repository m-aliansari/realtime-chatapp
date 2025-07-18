import { CLIENT_BASE_URL, CLIENT_BASE_URL_DEV } from "./client.js"

export const corsConfig = {
    origin: [CLIENT_BASE_URL, CLIENT_BASE_URL_DEV],
    credentials: true
}