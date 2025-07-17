export const authorizeUser = async (socket, next) => {
    if (!socket.request.session?.user) {
        next(new Error("Not authorized"))
    } else {
        next()
    }
}