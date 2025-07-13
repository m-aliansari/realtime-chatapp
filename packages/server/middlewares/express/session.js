import { RedisStore } from "connect-redis";
import session from "express-session";
import { redisClient } from "../../utils/redis.js";
import { appName } from "@realtime-chatapp/common";

export const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient, prefix: `${appName}:` }),
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
})

export const socketCompatibleMiddleware = expressMiddleware => (socket, next) => expressMiddleware(socket.request, {}, next)