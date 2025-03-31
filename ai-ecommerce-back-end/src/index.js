
import express from 'express';
import cors from 'cors';
import productRouter from './routes/ProductRouter.js';
import userRouter from './routes/UserRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api',productRouter)
app.use('/api',userRouter)


app.listen(process.env.PORT, ()=>{
    console.log(`Server rodando na porta ${process.env.PORT}`)
})