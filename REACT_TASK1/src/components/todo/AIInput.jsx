import { useState } from "react"
import { buildPrompt } from "../../utils/aiPrompts"
import { generateAIText } from '../../services/aiService'

function AIInput({input, context, onAccept}){

    const [isLoading, setIsLoading] = useState(false)
    const [generatedText, setGeneratedText] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const improveText = async () =>{
        setIsLoading(true)
        const finalPrompt = buildPrompt(context, input)
        if(finalPrompt === null){
            console.error("context not found! Please try again.")
        }else{
            const generatedText = await generateAIText(finalPrompt)
            console.log(generatedText,"=====generatedText")
            console.log("lets imagine API called, processed and provide enhanced version here")
            setGeneratedText(generatedText)
            setShowConfirm(true)
        }
        setIsLoading(false)
    }

    const acceptedSuggestion = () =>{
        onAccept(generatedText)
        resetSuggestions()
    }

    const resetSuggestions = () =>{
        setGeneratedText('')
        setShowConfirm(false)
    }

    return(
        <>
            {!isLoading && !showConfirm &&
                <button onClick={improveText}>✨</button>
            }
            {!isLoading && showConfirm && 
                <div>
                    <input className="primary__input" type="text" value={generatedText} onChange={(e)=>setGeneratedText(e.target.value)} />
                    <button onClick={acceptedSuggestion}>Accept</button>
                    <button onClick={resetSuggestions}>Cancel</button>
                </div>
            }
            {isLoading && <p>Generating...</p>}
        </>
    )
}

export default AIInput