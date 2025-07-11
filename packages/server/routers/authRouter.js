import { Router } from 'express'
import { ROUTES } from '../constants/routes.js'
import validateForm from '../middlewares/validateForm.js'
import { handleCheckLogin, handleLogin, handleRegister } from '../controllers/authController.js'
const router = Router()

router
    .route(ROUTES.AUTH.SPECIFIC.LOGIN)
    .get(handleCheckLogin)
    .post(validateForm, handleLogin)

router
    .post(ROUTES.AUTH.SPECIFIC.REGISTER, validateForm, handleRegister)

export default router