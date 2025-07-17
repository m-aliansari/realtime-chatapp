import { CLIENT_BASE_URL } from "./client.js"

export const corsConfig = {
    origin: [CLIENT_BASE_URL, "http://localhost:4173"],
    credentials: true
}