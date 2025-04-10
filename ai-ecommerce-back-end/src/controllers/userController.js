import User from '../models/user.js'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config()

const secret = process.env.JWT_SECRET; 

const userController={
     register: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.status(201).send(newUser);    
        } catch (error) {
            res.status(500).json({ error: 'Erro interno, tente novamente' });
        }
    },
    
    login : async (req, res) => {
        const { email, password } = req.body;
    
        try {
            let user = await User.findOne({ email });
            if (!user) return res.status(401).json({ error: 'Email ou senha incorretos' });
    
            user.isCorrectPassword(password, (err, same) => {
                if (!same) return res.status(401).json({ error: 'Email ou senha incorretos' });
    
                // Gerar o token JWT
                const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
                res.status(200).json({ user, token });
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno, tente novamente' });
        }
    },
    getUsers: async (req,res) =>{
        try {
            const users = await User.find();
            res.status(200).send(users);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    getUserById: async (req,res) =>{
        try {
            const user = await User.findById(req.params.id);
            res.status(200).send(user);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    createUser: async (req,res) =>{
        try {
            const newUser = await User.create(req.body);
            res.status(201).send(newUser);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    updateUser: async (req,res) =>{
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new : true });  
            res.status(200).send(updateUser);
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    deleteUserById: async (req,res) =>{
        try {
            const deleteUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).send(deleteUser)
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }
    
}
export default userController;