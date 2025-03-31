import User from '../models/user.js'
const userController={
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