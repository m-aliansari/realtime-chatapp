import { compare, hash } from "bcrypt"
import { pool } from "../utils/postgres.js"
import { ADD_NEW_USER, CHECK_USER_EXISTS, GET_USER_BY_USERNAME } from "../queries/users.js"
import { v4 as uuidv4 } from "uuid"
import { checkUserExists } from "../utils/users.js"

export const handleLogin = async (req, res) => {
    const potentialLogin = await pool.query(
        GET_USER_BY_USERNAME,
        [req.body.username]
    )

    if (potentialLogin.length === 0)
        return res.json({ loggedIn: false, status: "Wrong username or password!" })


    const isPassCorrect = compare(req.body.password, potentialLogin[0].passhash)

    if (!isPassCorrect)
        return res.json({ loggedIn: false, status: "Wrong username or password!" })

    const { username, user_id, id } = potentialLogin[0]

    req.session.user = {
        username,
        user_id,
        id
    }
    return res.json({ loggedIn: true, username: username })
}

export const handleCheckLogin = async (req, res) => {
    if (req.session.user && req.session.user.username) {
        return res.json({ loggedIn: true, username: req.session.user.username })
    } else {
        return res.json({ loggedIn: false })
    }
}

export const handleRegister = async (req, res) => {
    const userExists = await checkUserExists(req.body.username)

    if (userExists) return res.json({ loggedIn: false, status: "Username taken" })

    const hashedPass = await hash(req.body.password, 10);
    const newUserQuery = await pool.query(
        ADD_NEW_USER,
        [uuidv4(), req.body.username, hashedPass]
    )

    const { username, user_id, id } = newUserQuery[0]

    req.session.user = {
        username,
        user_id,
        id
    }
    return res.json({ loggedIn: true, username: username })
}