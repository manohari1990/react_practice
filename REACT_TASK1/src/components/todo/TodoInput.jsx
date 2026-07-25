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
        <>
            <div className='pt-5 mb-5'>
                <label
                    for="todo-title"
                    className="block mb-2.5 text-sm font-medium text-heading">
                    Todo Title
                </label>

                <div className="flex items-center gap-2">
                    <input
                        id="todo-title"
                        name="title"
                        placeholder="Todo Title"
                        onChange={(e)=> handleInputChange(e.target.name, e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 text-heading text-sm px-3 py-2.5"
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
            </div>
            <div className='mb-5'>
                <label
                    for="todo-title"
                    className="block mb-2.5 text-sm font-medium text-heading">
                    Todo Details
                </label>

                <div className="flex items-center gap-2">
                    <textarea 
                        placeholder='Todo Details' 
                        value={todoForm.details} 
                        className="w-full rounded-lg border-gray-300 border text-heading text-sm px-3 py-2.5" 
                        name='details' 
                        cols={25} 
                        rows={3} 
                        onChange={(e)=> handleInputChange(e.target.name, e.target.value)}>
                            {todoForm.details}
                        </textarea>
                    <AISpeechInput 
                        inputName = "details"
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
            </div>
            <div className='flex items-center gap-4 mb-5'>
                {!isUpdate && !enableListening ? 
                    <button className="rounded-lg px-4 py-2 bg-gray-900 text-gray-100" onClick={handleAddTodo}>Add</button> : 
                    !enableListening && 
                        <>
                            {isUpdate && 
                                <button className="rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300" onClick={handleCancelUpdate}>Cancel</button>
                            }
                            <button className="rounded-lg px-4 py-2 bg-gray-900 text-gray-100" onClick={handleUpdateItem}>Update</button>
                        </>
                }
            </div>
        </>
    )
}

export default TodoInput
