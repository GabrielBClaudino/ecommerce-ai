import aiService from '../services/aiService.js'

const geminiController = {
    promptToGemini: async (req, res) =>{
        const result = await aiService.prompt(req.body.prompt)
        res.status(200).json({message: result.text()})
    },
    longContext: async (req, res) =>{
        const pdfPath = './src/context/Banco.pdf'
        const result = await aiService.longContext(req.body.prompt, pdfPath)
        res.status(200).json({message: result.text()})
    }
}

export default geminiController