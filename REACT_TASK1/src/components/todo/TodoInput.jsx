// Responsible only for
// input, Add button

import { useState } from 'react'
import AISpeechInput from './AISpeechInput'
import AIInput from './AIInput'

function TodoInput({todoForm, handleAddTodo, handleUpdateItem, handleCancelUpdate, handleInputChange, isUpdate}) {
    const [enableListening, setEnableListening] = useState(false)
    const captureSpeech = (response) =>{
        setEnableListening(prev=>!prev)
        // if(!response.error){
        //     handleInputChange(response.message)
        // }
    }
    return(
        <div className="">
            <div>
                <input 
                    placeholder="Todo Title" 
                    className="primary__input" 
                    name="title" 
                    value={todoForm.title} 
                    onChange={(e)=> handleInputChange(e.target.name, e.target.value)}
                />
                <AISpeechInput 
                    inputName = "title"
                    captureSpeech={captureSpeech}
                    enableListening={enableListening}
                    setEnableListening={setEnableListening}
                />
                <AIInput 
                    inputName = "title"
                    input={todoForm.title} 
                    context={"improveTodo"} 
                    onAccept={handleInputChange}
                />
            </div>
            <div>
                <textarea 
                    placeholder='Todo Details' 
                    value={todoForm.details} 
                    className="primary__input" 
                    name='details' 
                    cols={25} 
                    rows={3} 
                    onChange={(e)=> handleInputChange(e.target.name, e.target.value)}>
                        {todoForm.details}
                    </textarea>
                <AISpeechInput 
                    inputName = "title"
                    captureSpeech={captureSpeech} 
                    enableListening={enableListening} 
                    setEnableListening={setEnableListening}
                />
                <AIInput 
                    inputName = "details"
                    input={todoForm.details} 
                    context={"improveTodo"} 
                    onAccept={handleInputChange}
                />
            </div>
            <div>
                {!isUpdate && !enableListening ? 
                    <button className="primary__button" onClick={handleAddTodo}>Add</button> : 
                    !enableListening && 
                        <>
                            {isUpdate && 
                                <button className="primary__button" onClick={handleCancelUpdate}>X</button>
                            }
                            <button className="primary__button" onClick={handleUpdateItem}>Update</button>
                        </>
                }
            </div>
            
        </div>
    )
}

export default TodoInput
