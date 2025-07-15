export const authorizeUser = async (socket, next) => {
    if (!socket.request.session?.user) {
        next(new Error("Not authorized"))
    } else {
        socket.user = { ...socket.request.session.user };
        socket.join(socket.user.user_id);
        next()
    }
}