import {GoogleGenAI} from '@google/genai'
import {MODEL_NAME} from '../utils/Constants'
const apiKey = process.env.AI_TEXT_GENERATION_API_KEY
const genAI = new GoogleGenAI({apiKey})

export async function generateAIText(prompt){
    /**
     * Send request to Gemini
     * Extract generated text
     * Return text
     * Throw error if anything goes wrong
     */
    try{
        const response = await genAI.models.generateContent({
            contents: prompt,
            model: MODEL_NAME
        })
        return response.text
    }catch (error){
        console.log("Error communicating with Gemeni API:", error)
        throw error;
    }
}