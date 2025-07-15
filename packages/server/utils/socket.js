import { appName, SOCKET_EVENTS } from "@realtime-chatapp/common"
import { redisClient } from "./redis.js"

const getHashMapKey = (username) => `${appName}:user_id:${username}`
const getFriendsListKey = (username) => `${appName}:friends:${username}`

const parseFriendList = async (friendList) => {
    const newFriendList = []

    for (let friend of friendList) {
        const [friendUsername, friendUserId] = friend.split(".")

        const friendConnected = (await redisClient.hGet(getHashMapKey(friendUsername), "connected")) === "true"

        newFriendList.push({
            username: friendUsername,
            user_id: friendUserId,
            connected: friendConnected
        })
    }

    return newFriendList
}

export const initializeUser = async socket => {
    await redisClient.hSet(
        getHashMapKey(socket.user.username),
        {
            "user_id": socket.user.user_id,
            "connected": "true"
        }
    )

    const key = getFriendsListKey(socket.user.username)
    const friendList = await redisClient.lRange(key, 0, -1)


    const parsedList = await emitConnectionStatus(socket, true, friendList)

    socket.emit(SOCKET_EVENTS.FRIENDS_LIST, parsedList)
}

export const handleSocketAddFriend = async (socket, username, cb) => {
    if (username === socket.user.username) {
        cb({ done: false, errorMsg: "Cannot add self" })
        return
    }

    const key = getHashMapKey(username)
    const friend = await redisClient.hGetAll(
        key
    )

    if (!friend) {
        cb({ done: false, errorMsg: "No such user exists!" })
        return
    }

    const currentFriendList = await redisClient.lRange(
        getFriendsListKey(socket.user.username),
        0, -1
    )

    if (currentFriendList?.length && currentFriendList.indexOf(username) !== -1) {
        cb({ done: false, errorMsg: "Friend already added!" })
        return
    }

    await redisClient.lPush(
        getFriendsListKey(socket.user.username),
        [username, friend.user_id].join(".")
    )

    cb({ done: true, addedFriend: { username, user_id: friend.user_id, connected: (friend.connected ?? "false") === "true" } })
    return
}

export const handleDisconnect = async socket => {
    try {
        await redisClient.hSet(
            getHashMapKey(socket.user.username),
            { "connected": "false" }
        )
    } catch (error) {
        console.log("error in handleDisconnect");

        console.log(error);
    }

    await emitConnectionStatus(socket, false)
}

const emitConnectionStatus = async (socket, connected, friends = null) => {
    let friendList = friends ? [...friends] : null;

    if (!friendList) {
        friendList = await redisClient.lRange(
            getFriendsListKey(socket.user.username),
            0,
            -1
        )
    }

    const parsed = await parseFriendList(friendList)

    const friendRooms = parsed.map(
        friend => friend.user_id
    )

    if (friendRooms?.length)
        socket
            .to(friendRooms)
            .emit(SOCKET_EVENTS.CONNECTION_STATUS_CHANGED, connected, socket.user.username)

    return parsed
}