
import { appName } from "@realtime-chatapp/common"
import { redisClient } from "../../utils/redis.js"

/**
    * Limits API requests by user IP.
    * @param {import("express").Request} req - Request object.
    * @param {import("express").Response} res - Response object.
    * @param {import("express").NextFunction} next - The next function.
    * @returns {import("express").Response | void} 
*/
export const rateLimiter = (secondsLimit, limitAmount) => async (req, res, next) => {
    const ip = req.socket.remoteAddress
    const key = `${appName}:rate-limit:${ip}`
    const [response] = await redisClient.multi().incr(key).expire(key, secondsLimit).exec();

    if (response > limitAmount)
        return res
            .status(429)
            .json({ loggedIn: false, status: "Too many requests" })
    return next()
}