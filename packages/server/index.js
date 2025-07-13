import "dotenv/config.js";
import express, { json } from "express";
import { default as helmet } from "helmet";
import { Server } from "socket.io";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import { ROUTES } from "./constants/routes.js";
import http from 'http';
import { redisClient } from "./utils/redis.js";
import { sessionMiddleware, socketCompatibleMiddleware } from "./middlewares/express/session.js";
import { corsConfig } from "./constants/cors.js";
import { authorizeUser } from "./middlewares/socket/authorizeUser.js";
import { SOCKET_EVENTS } from "@realtime-chatapp/common";
import { handleSocketAddFriend, initializeUser } from "./utils/socket.js";

redisClient.connect().catch(console.error)

const app = express();
const server = http.createServer(app)

const socketio = new Server(server, {
    cors: corsConfig
})

// express middlewares
app.use(helmet())
app.use(cors(corsConfig))
app.use(json())
app.use(sessionMiddleware)

// routers
app.use(ROUTES.AUTH.BASE, authRouter)

// socket middlewares
socketio.use(socketCompatibleMiddleware(sessionMiddleware))
socketio.use(authorizeUser)

socketio.on("connect", async socket => {
    await initializeUser(socket)
    socket.on(SOCKET_EVENTS.ADD_FRIEND, (username, cb) => { handleSocketAddFriend(socket, username, cb) })
})


server.listen(4000, () => {
    console.log("Server listening on port 4000");
})