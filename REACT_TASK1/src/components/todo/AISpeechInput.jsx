/**
 * 
 * TODO:
 * - Fix microphone environment
 * - Replace useState(recognition) with useRef
 * - Call captureSpeech() from onresult
 * - Test permission denied flow
 * - Test no speech detected
 * 
 */

import { useEffect, useState } from "react";

function AISpeechInput({captureSpeech, enableListening, setEnableListening}){
    let message = ''
    const [recognition, setRecognition] = useState(null)

    const startListen = () =>{
        if(recognition){
            recognition.start()
        }
    }

    const stopListen = () =>{
        if(recognition){
            recognition.stop()
        }
    }

    useEffect(()=>{
        if("webkitSpeechRecognition" in window || "SpeechRecognition" in window){

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition() // init speech recognition instance

            //config settings
            recognitionInstance.lang = "en-US"
            recognitionInstance.continuous = false
            recognitionInstance.interimResults = false
            
            recognitionInstance.onstart = () =>{
                setEnableListening(true)
            }
            recognitionInstance.onresult = (event) =>{
                const transcript = event.results[0][0].transcript
                message = {'message': transcript}
                captureSpeech(message)
                console.log('Confidence score:', event.results[0][0].confidence)
            }
            recognitionInstance.onend = ()=>{
                setEnableListening(false)
            }

            setRecognition(recognitionInstance)

            recognitionInstance.onerror = (event) =>{
                console.error('Error:', event.error)
                message = {'error': event.error}
            }
        }else{
            message = {'error':"Your browser does not support the Web speech API"}
        }
    },[])

    return(
        <>
            {
                enableListening ?
                <div>
                    <span>Listening...</span>
                    <button className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300" onClick={stopListen}>Stop</button>
                </div>
                : <button className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300" onClick={startListen}>
                    <svg 
                        class="w-4 h-4 text-gray-700" 
                        fill="none" stroke="currentColor" 
                        stroke-width="2" 
                        viewBox="0 0 24 24" 
                        xmlns="http://w3.org">
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        ></path>
                    </svg>
                </button>
            }
        </>
    )
}

export default AISpeechInput