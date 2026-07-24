import { useEffect, useState } from "react"
import { buildPrompt } from "../../utils/aiPrompts"
import { generateAIText } from '../../services/aiService'

function AIInput({input, inputName, context, onAccept}){

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
                <button className="primary__button no__bg" onClick={improveText}>✨</button>
            }
            {!isLoading && showConfirm && 
                <div>
                    <input className="primary__input" type="text" value={generatedText} onChange={(e)=>setGeneratedText(e.target.value)} />
                    <button className="primary__button" onClick={acceptedSuggestion}>Accept</button>
                    <button className="primary__button" onClick={resetSuggestions}>Cancel</button>
                </div>
            }
            {isLoading && <p>Generating...</p>}
            {error.length > 0 && <p>{error}</p>}
        </>
    )
}

export default AIInput