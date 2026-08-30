import { useEffect, useRef, useState } from "react"
import { buildPrompt } from "../../utils/aiPrompts"
import { generateAIText } from '../../services/aiService'

function AIInput({input, inputName, context, onAccept, htmlClass}){

    const [isLoading, setIsLoading] = useState(false)
    const [generatedText, setGeneratedText] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [error, setError] = useState('')
    const aiButtonRef = useRef(null)
    const [buttonPosotion, setButtonPosotion] = useState({ top: 0, right:0 })
    useEffect(()=>{
        resetSuggestions()
    },[input])

    const improveText = async () =>{
        if(input.length<1){
            return false
        }
        setIsLoading(true)
        const finalPrompt = buildPrompt(context, input)
        const rect = aiButtonRef.current.getBoundingClientRect()
        console.log(rect)
        setButtonPosotion({
            top: rect.bottom - window.scrollY - 100,
            right: window.innerWidth - rect.width - rect.right - 100
        })
        try{
            const generatedText = "Demo AI Text..."//await generateAIText(finalPrompt)
            setGeneratedText(generatedText)
            setShowConfirm(true)
        }catch(e){
            console.error(e)
            setShowConfirm(true)
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
                    <div className={`${htmlClass} cursor-pointer`} onClick={improveText} ref={aiButtonRef}>
                        <span className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 text-base text-gray-500  placeholder:text-gray-400 sm:text-sm/6">Improve</span>
                        <svg width="26" height="26" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" >
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                                    <stop offset="0%" stopColor="#197DFF" />
                                    <stop offset="100%" stopColor="#A13DFF" />
                                </linearGradient>
                            </defs>

                            <path fill="url(#gradient)" d="M128 22 C138 22 145 38 149 63 C154 90 166 102 193 107 C218 111 234 118 234 128
                                C234 138 218 145 193 149 C166 154 154 166 149 193 C145 218 138 234 128 234 C118 234 111 218 107 193 C102 166 90 154 63 149 C38 145 22 138 22 128 C22 118 38 111 63 107 C90 102 102 90 107 63 C111 38 118 22 128 22 Z" />

                            <path fill="url(#gradient)" d="M72 170 C75 170 77 176 79 183 C81 190 85 194 92 196 C99 198 105 200 105 203 C105 206 99 208 92 210 C85 212 81 216 79 223 C77 230 75 236 72 236 C69 236 67 230 65 223 C63 216 59 212 52 210 C45 208 39 206 39 203 C39 200 45 198 52 196 C59 194 63 190 65 183 C67 176 69 170 72 170 Z" />
                        </svg>
                    </div>
                // </button>
            }
            {!isLoading && showConfirm && 
            <div className="flex items-center justify-center fixed z-50" style={{
                    top: buttonPosotion.top,
                    right: buttonPosotion.right
                }}
>
                <div className="max-w-sm p-6 bg-white rounded-2xl shadow-lg border border-slate-100 transition-all duration-300 ">
                    {error.length > 0 ? 
                        <div className="flex ">
                            
                            <p className="text-slate-600">{error}</p>
                            <span onClick={resetSuggestions} className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" strokeLinejoin="round"
                                    >
                                    <path d="M6 6L18 18" />
                                    <path d="M18 6L6 18" />
                                </svg>
                            </span>
                        </div>
                        : <>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">AI Suggestion</h3>
                            <p className="text-slate-600 whitespace-pre-line">{generatedText}</p>
                            <div className="flex p-2 gap-3 justify-end">
                                <button type="button" onClick={acceptedSuggestion} class="px-2.5 py-1.5 text-slate-900 dark:text-slate-50 text-xs font-semibold rounded-md cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-neutral-700 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Continue</button>

                                <button type="button" onClick={resetSuggestions} class="px-2.5 py-1.5 text-red-900 dark:text-slate-50 text-xs font-semibold rounded-md cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-neutral-700 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Discard</button>
                            </div>
                        </>
                    }
                    
                </div>
            </div>
            }
            {isLoading && 
                // <div className="space-x-4 flex justify-center mt-6">
                    <div role="status">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="size-9 animate-[spin_0.8s_linear_infinite] fill-blue-600 dark:fill-blue-500" viewBox="0 0 24 24"
                            aria-hidden="true">
                            <path
                                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                data-original="#000000" />
                        </svg>
                        <span className="sr-only">Loading…</span>
                    </div>
                // </div>
            }
            {/* {error.length > 0 && <p>{error}</p>} */}
        </>
    )
}

export default AIInput