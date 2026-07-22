import { useState } from "react"
import { buildAIPrompt } from "../../utils/helpers"

function AIInput({input, context, onAccept}){

    const [isLoading, setIsLoading] = useState(false)
    const [generatedText, setGeneratedText] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const improveText = async () =>{
        setIsLoading(true)
        const updatedContext = buildAIPrompt(context, input)
        // const suggestionText = await improveTodo(input);
        console.log("lets imagine API called, processed and provide enhanced version here")
        setGeneratedText(suggestionText)
        setIsLoading(false)
        setShowConfirm(true)
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