import { appName } from "@realtime-chatapp/common"
import { redisClient } from "../../utils/redis.js"

export const authorizeUser = async (socket, next) => {
    if (!socket.request.session?.user) {
        next(new Error("Not authorized"))
    } else {
        socket.user = { ...socket.request.session.user }
        await redisClient.hSet(
            `${appName}:user_id:${socket.user.username}`,
            "user_id", socket.user.user_id
        )
        next()
    }
}