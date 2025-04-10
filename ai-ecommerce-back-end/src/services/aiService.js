import {GoogleGenerativeAI} from '@google/generative-ai'
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config()
const apiKey = process.env.GEMINI_API_KEY
const genAi = new GoogleGenerativeAI(apiKey)

const model = genAi.getGenerativeModel({
    model: "gemini-1.5-flash"
})

const service = {
    prompt: async (prompt) =>{
        const p = {
            "contents":[
                {
                    "parts":[
                        {"text": prompt}
                    ]
                }
            ]
        }
        const result = await model.generateContent(p,{timeout:6000})
        return result.response
    },

    longContext: async (name, prompt, pdfPath) => {
        const instructions =`
        You are an elite researcher and subject matter expert with advanced analytical skills. Your expertise lies in carefully scrutinized comprehensive documents and synthesizing clear evidence-based answers.

            Task Description:
            You will be provided with a full-length document along with a query. Your task is to:
            1. Thoroughly Analyze: Read and understand the entire document, identifying all sections, details, and evidence that may be relevant to the query.
            2. Synthesize Information: Extract and integrate the pertinent information into a coherent and concise answer.
            3. Support Your Answer: Where applicable, reference specific parts of the document to substantiate your conclusions.
            4. Highlight Ambiguities: If the document does not fully address the query or leaves room for interpretation, clearly indicate it any assumptions or uncertainties.

            Tone & Style:
            Use formal, precise language suitable for academic and professional research. Your answer should be clear, logical, and directly focused on adressing the query.

            language response: PT-BR

            Instructions:
            Query: Owner Query:${name},${prompt}

            Document: [Full document text provided]

            Provide the document title and a final answer that is based solely on the content of the document, meeting all the task descriptions requirements.
            Caso não tenha um titulo coloque um baseado no que tiver no documento, não coloque os ids pois é uma informação sigilosa
            tente não colocar observações desnecessarias para o cliente já que ele não que sabe mais nada alem do que tem no query.
        `
        const pdf = await fs.readFileSync(pdfPath)
        const pdfBase64 = await pdf.toString('base64')
        const p = {
            "contents":[
                {
                    "parts":[
                        {"text": instructions},
                        {"inline_data": {"mime_type":"application/pdf","data": pdfBase64}}
                    ]
                }
            ]
        }
        const result = await model.generateContent(p,{timeout:6000})
        return result.response

    }
}

export default service