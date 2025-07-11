import { Router } from 'express'
import { ROUTES } from '../constants/routes.js'
import validateForm from '../middlewares/validateForm.js'
import { handleCheckLogin, handleLogin, handleRegister } from '../controllers/authController.js'
import { rateLimiter } from "../middlewares/rateLimiter.js"
const router = Router()

router
    .route(ROUTES.AUTH.SPECIFIC.LOGIN)
    .get(handleCheckLogin)
    .post(rateLimiter(60, 10), validateForm, handleLogin)

router
    .post(ROUTES.AUTH.SPECIFIC.REGISTER, rateLimiter(60, 5), validateForm, handleRegister)

export default router