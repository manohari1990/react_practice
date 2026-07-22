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
                    <button className="primary__button" onClick={stopListen}>Stop</button>
                </div>
                : <button className="no__bg" onClick={startListen}>🎤</button>
            }
        </>
    )
}

export default AISpeechInput