import express from "express"
import {registerController,loginController,testController} from "../controllers/authController.js"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/register', registerController)

// Login || Post
router.post('/login',loginController);

// test Router
router.get('/test',requireSignIN,isAdmin,testController)
export default router