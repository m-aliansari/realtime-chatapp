import "dotenv/config.js";
import express, { json } from "express";
import { default as helmet } from "helmet";
import { Server } from "socket.io";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import { ROUTES } from "./constants/routes.js";
import { CLIENT_BASE_URL } from "./constants/client.js";
import http from 'http';
import session from "express-session";
import { createClient } from "redis"
import { RedisStore } from "connect-redis"
const redisClient = createClient()

redisClient.connect().catch(console.error)

const app = express();

const server = http.createServer(app)

const socketio = new Server(server, {
    cors: {
        origin: CLIENT_BASE_URL,
        credentials: true
    }
})

app.use(helmet())
app.use(cors({
    origin: CLIENT_BASE_URL,
    credentials: true
}))
app.use(json())
app.use(session({
    store: new RedisStore({ client: redisClient, prefix: "realtime-chatapp:" }),
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
    }
}))

app.use(ROUTES.AUTH.BASE, authRouter)


socketio.on("connect", socket => { })

server.listen(4000, () => {
    console.log("Server listening on port 4000");
})