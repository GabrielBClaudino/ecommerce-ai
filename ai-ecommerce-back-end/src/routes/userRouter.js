
import express from 'express';
import userController from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/user')
.get((req,res)=> userController.getUsers(req,res))
.post((req,res)=> userController.createUser(req,res))


userRouter.route('/user/:id')
.get((req,res)=> userController.getUserById(req,res))
.put((req,res)=> userController.updateUser(req,res))
.delete((req,res)=> userController.deleteUserById(req,res))

export default userRouter