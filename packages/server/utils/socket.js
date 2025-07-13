import { appName, SOCKET_EVENTS } from "@realtime-chatapp/common"
import { redisClient } from "./redis.js"

export const initializeUser = async socket => {
    socket.user = { ...socket.request.session.user }
    await redisClient.hSet(
        `${appName}:user_id:${socket.user.username}`,
        "user_id", socket.user.user_id
    )

    const friendList = await redisClient.lRange(`${appName}:friends:${socket.user.username}`, 0, -1)

    socket.emit(SOCKET_EVENTS.FRIENDS_LIST, friendList)
}

export const handleSocketAddFriend = async (socket, username, cb) => {
    if (username === socket.user.username) {
        cb({ done: false, errorMsg: "Cannot add self" })
        return
    }

    const friendUserID = await redisClient.hGet(
        `${appName}:user_id:${username}`,
        "user_id"
    )

    if (!friendUserID) {
        cb({ done: false, errorMsg: "No such user exists!" })
        return
    }

    const currentFriendList = await redisClient.lRange(
        `${appName}:friends:${socket.user.username}`,
        0, -1
    )

    if (currentFriendList?.length && currentFriendList.indexOf(username) !== -1) {
        cb({ done: false, errorMsg: "Friend already added!" })
        return
    }

    await redisClient.lPush(
        `${appName}:friends:${socket.user.username}`,
        username
    )

    cb({ done: true })
    return
}