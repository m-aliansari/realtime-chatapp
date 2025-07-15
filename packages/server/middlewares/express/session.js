import { RedisStore } from "connect-redis";
import session from "express-session";
import { redisClient } from "../../utils/redis.js";
import { appName } from "@realtime-chatapp/common";

export const sessionMiddleware = session({
    secret: process.env.COOKIE_SECRET,
    store: new RedisStore({ client: redisClient, prefix: `${appName}:sessions:` }),
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production' ? "true" : "auto",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
    }
})

export const socketCompatibleMiddleware =
    expressMiddleware =>
        (socket, next) =>
            expressMiddleware(socket.request, {}, next)