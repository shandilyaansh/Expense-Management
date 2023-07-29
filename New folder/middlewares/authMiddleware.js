import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"

// Protect routes token base
export const requireSignIN = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
    }
}
// Admin Access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized access'
            })
        }
        else next();
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: 'Error in Admin Middleware',
            error
        })
    }
}