import express from 'express';
import cors from 'cors';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/UserRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { WebSocketServer } from 'ws';
import aiService from './services/aiService.js'
import geminiRouter from './routes/geminiRouter.js';
import orderRouter from './routes/orderRouter.js';

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const app = express()
const server = http.createServer(app)
const ws = new WebSocketServer({ server })
const clients = new Set()
ws.on('connection', (client)=>{
    
    clients.add(client)
    client.on('message', async (message) => {
        const parsed = JSON.parse(message.toString());

        // Se for uma mensagem para o Gemini
        if (parsed.event === 'ai-chat') {
            const context = './src/context/Banco.pdf';
            const result = await aiService.longContext(parsed.sentBy, parsed.text, context);
            const msgString = JSON.stringify({ text: result.text(), sentBy: 'Gemini' });
            if(client.readyState === WebSocket.OPEN){
                client.send(msgString);
            }
        } else {
            for (let c of clients) {
                if (c.readyState === WebSocket.OPEN) {
                    c.send(message.toString());
                }
            }
        }
    });
    client.on('close', ()=>{
        clients.delete(client)
        console.log('Cliente desconectado do chat')
    })

}) 

app.use(express.json())
app.use(cors())
app.use('/api',productRouter)
app.use('/api',userRouter)
app.use('/api', geminiRouter)
app.use('/api', orderRouter)


server.listen(process.env.PORT, ()=>{
    console.log(`Server rodando na porta ${process.env.PORT}`)
})
