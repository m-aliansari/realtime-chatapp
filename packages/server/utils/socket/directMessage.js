import { SOCKET_EVENTS } from "@realtime-chatapp/common"
import { redisClient } from "../redis.js"
import { getMessagesKey } from "./common.js"
import { v4 as uuidv4 } from 'uuid'

export const handleDirectMessage = async (socket, message, cb) => {
    try {
        const { to, content } = message
        const from = socket.user.user_id
        const messageId = uuidv4()

        const messageString = [messageId, to, from, content].join('.')

        await redisClient.lPush(getMessagesKey(to), messageString)
        await redisClient.lPush(getMessagesKey(from), messageString)

        socket.to(to).emit(SOCKET_EVENTS.DIRECT_MESSAGE, { to, from, content, messageId })
        cb({ done: true, messageId })
    } catch (error) {
        cb({ done: false })
    }
}