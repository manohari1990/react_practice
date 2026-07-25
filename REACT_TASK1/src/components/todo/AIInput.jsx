import { useEffect, useState } from "react"
import { buildPrompt } from "../../utils/aiPrompts"
import { generateAIText } from '../../services/aiService'

function AIInput({input, inputName, context, onAccept, htmlClass}){

    const [isLoading, setIsLoading] = useState(false)
    const [generatedText, setGeneratedText] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        resetSuggestions()
    },[input])

    const improveText = async () =>{
        if(input.length<1){
            return false
        }
        setIsLoading(true)
        const finalPrompt = buildPrompt(context, input)
        try{
            const generatedText = await generateAIText(finalPrompt)
            setGeneratedText(generatedText)
            setShowConfirm(true)
        }catch(e){
            setError("❌ Gemini service is temporarily unavailable! Try again later.")
        }finally{
            setIsLoading(false)
        }
    }

    const acceptedSuggestion = () =>{
        onAccept(inputName, generatedText)
        resetSuggestions()
    }

    const resetSuggestions = () =>{
        setGeneratedText('')
        setShowConfirm(false)
    }

    return(
        <>
            {!isLoading && !showConfirm &&
                <button className={`rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300 ${htmlClass}`} onClick={improveText}>
                    <svg 
                        className="w-4 h-4 text-white-600" 
                        xmlns="http://w3.org" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M9.813 15.904 9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.187L15 15l-5.187.813ZM18.041 5.041 17 9l-1.041-3.959L12 4l3.959-1.041L17 0l1.041 3.959L22 4l-3.959 1.041ZM19 18l-1.5 1.5L16 18l1.5-1.5L19 18Z" 
                        />
                    </svg>
                </button>
            }
            {!isLoading && showConfirm && 
                <div className="flex items-center gap-2 m-2">
                    <input className="flex-1 rounded-lg border border-gray-300 text-heading text-sm px-3 py-2.5" type="text" value={generatedText} onChange={(e)=>setGeneratedText(e.target.value)} />
                    <button className="rounded-lg px-4 py-2 bg-gray-900 text-gray-100" onClick={acceptedSuggestion}>Accept</button>
                    <button className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300" onClick={resetSuggestions}>Cancel</button>
                </div>
            }
            {isLoading && <p>Generating...</p>}
            {error.length > 0 && <p>{error}</p>}
        </>
    )
}

export default AIInput