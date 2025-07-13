import { CHECK_USER_EXISTS } from "../queries/users.js"
import { pool } from "./postgres.js"

export const checkUserExists = async username => {
    try {
        await pool.query(
            CHECK_USER_EXISTS,
            [username]
        )
        if (existingUser.length !== 0) {
            return true
        }
        return false
    } catch (error) {
        console.log(error);

        return false
    }
}