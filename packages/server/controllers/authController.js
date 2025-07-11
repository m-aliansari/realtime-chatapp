import { compare, hash } from "bcrypt"
import { pool } from "../db"

export const handleLogin = async (req, res) => {
    const potentialLogin = await pool.query(
        "SELECT user_id, username, passhash FROM users WHERE username=$1",
        [req.body.username]
    )

    if (potentialLogin.length === 0)
        return res.json({ loggedIn: false, status: "Wrong username or password!" })


    const isPassCorrect = compare(req.body.password, potentialLogin[0].passhash)

    if (!isPassCorrect)
        return res.json({ loggedIn: false, status: "Wrong username or password!" })

    const { username, user_id: id } = potentialLogin[0]

    req.session.user = {
        username,
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
    const existingUser = await pool.query(
        "SELECT username FROM users WHERE username=$1",
        [req.body.username]
    )

    if (existingUser.length !== 0) {
        return res.json({ loggedIn: false, status: "Username taken" })
    }

    const hashedPass = await hash(req.body.password, 10);
    const newUserQuery = await pool.query(
        "INSERT INTO users(username, passhash) VALUES($1, $2) RETURNING user_id, username",
        [req.body.username, hashedPass]
    )

    const { username, user_id: id } = newUserQuery

    req.session.user = {
        username,
        id
    }
    return res.json({ loggedIn: true, username: username })
}