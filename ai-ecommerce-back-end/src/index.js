
import express from 'express';
import cors from 'cors';
import productRouter from './routes/ProductRouter.js';
import userRouter from './routes/UserRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { WebSocketServer } from 'ws';

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const app = express()
const server = http.createServer(app)
const ws = new WebSocketServer({ server })
const clients = new Set()
ws.on('connection', (client)=>{
    clients.add(client)
    console.log('Cliente conectado ao chat')
    client.on('message', (message)=>{
        const msg = message.toString()
        for (let c of clients){
            if (c.readyState === WebSocket.OPEN){
                c.send(msg)
            }
        }
    })
    client.on('close', ()=>{
        clients.delete(client)
        console.log('Cliente desconectado do chat')
    })

}) 

app.use(express.json())
app.use(cors())
app.use('/api',productRouter)
app.use('/api',userRouter)


server.listen(process.env.PORT, ()=>{
    console.log(`Server rodando na porta ${process.env.PORT}`)
})