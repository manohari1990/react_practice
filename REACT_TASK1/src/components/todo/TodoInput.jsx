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
                    onChange={(e)=> handleInputChange(e)}
                />
                <AISpeechInput 
                    captureSpeech={captureSpeech} 
                    enableListening={enableListening} 
                    setEnableListening={setEnableListening}
                />
                <AIInput 
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
                    onChange={(e)=> handleInputChange(e)}>
                        {todoForm.details}
                    </textarea>
                <AISpeechInput 
                    captureSpeech={captureSpeech} 
                    enableListening={enableListening} 
                    setEnableListening={setEnableListening}
                />
                <AIInput 
                    input={todoForm.title} 
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



// function TodoInput({input, handleAddTodo, handleUpdateItem, handleCancelUpdate, handleInputChange, isUpdate}) {
//     return(
//         <div className="row_content">
//             <div>
//                 <input placeholder="Enter your todo title" className="primary__input" value={input.title} onChange={(e)=> handleInputChange({'title':e.target.value})}/>{isUpdate && <button className="primary__button" onClick={handleCancelUpdate}>X</button>}
//                 <textarea placeholder="Enter your todo details" className="primary__input" value={input.detail} onChange={(e)=> handleInputChange({'details':e.target.value})}/>
//             </div>
//             {!isUpdate ? <button className="primary__button" onClick={handleAddTodo}>Add</button> : <button className="primary__button" onClick={handleUpdateItem}>Update</button>}
            
//         </div>
//     )
// }

// export default TodoInput