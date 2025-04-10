import express from 'express';
import geminiController from '../controllers/geminiController.js';

const geminiRouter= express.Router()

geminiRouter.route('/prompt')
.post((req, res)=> geminiController.promptToGemini(req,res))

geminiRouter.route('/longcontext')
.post((req, res)=> geminiController.longContext(req,res))


export default geminiRouter;