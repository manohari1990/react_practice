import { Router } from "express";
import { userRegister } from '../controllers/auth.controller.js';
import { body } from "express-validator";

const ValidationRules = [
    body('username').notEmpty().withMessage("").bail()
                    .isLength({ min: 8, max: 15 }).withMessage('Please enter valid username.').escape(), // also provide special char validation
    body('email').isEmail().withMessage('Please enter valid email.').normalizeEmail(),
    body('phone').optional().isMobilePhone().withMessage('Please enter valid Phone number.'),
    body('first_name').notEmpty().withMessage('Please enter First Name.').escape(),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Please enter password, minimum 8 characters').escape()
]

const authRouter = Router()

authRouter.post('/register', ValidationRules, userRegister)

export default authRouter