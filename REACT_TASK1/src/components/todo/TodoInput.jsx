// Responsible only for
// input, Add button

import { useState } from 'react'
import AISpeechInput from './AISpeechInput'
import AIInput from './AIInput'
import {TodoPriorityOption} from '../../utils/Constants'

function TodoInput({ todoForm, handleAddTodo, handleUpdateItem, handleCancelUpdate, handleInputChange, isUpdate }) {
    const [enableListening, setEnableListening] = useState(false)
    const captureSpeech = (response) => {
        setEnableListening(prev => !prev)
        // if(!response.error){
        //     handleInputChange(response.message)
        // }
    }
    return (
        <>
            <div className='pt-5 mb-5'>
                <label
                    htmlFor="todo-title"
                    className="block mb-2.5 text-sm font-medium text-heading">
                    Todo Title
                </label>

                <div className="flex items-start gap-2">
                    <div className='w-full relative'>
                        <input
                            id="todo-title"
                            name="title"
                            value={todoForm.title}
                            placeholder="Todo Title"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            className="flex-1 w-full rounded-lg border border-gray-300 text-heading text-sm px-3 py-2.5"
                            required
                        />
                        <AIInput
                            inputName="title"
                            input={todoForm.title}
                            context={"improveTodo"}
                            onAccept={handleInputChange}
                            htmlClass='absolute right-0'
                        />
                    </div>


                    <AISpeechInput
                        inputName="title"
                        captureSpeech={captureSpeech}
                        enableListening={enableListening}
                        setEnableListening={setEnableListening}
                    />

                </div>
            </div>
            
            <div className='mb-5'>
                <label
                    htmlFor="todo-title"
                    className="block mb-2.5 text-sm font-medium text-heading">
                    Todo Details
                </label>

                <div className="flex items-center gap-2">
                    <div className='w-full relative'>
                        <textarea
                            placeholder='Todo Details'
                            value={todoForm.details}
                            className="w-full rounded-lg border-gray-300 border text-heading text-sm px-3 py-2.5"
                            name='details'
                            cols={25}
                            rows={3}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            required
                        >
                            {todoForm.details}
                        </textarea>
                        <AIInput
                            inputName="details"
                            input={todoForm.details}
                            context={"improveTodo"}
                            onAccept={handleInputChange}
                            htmlClass='absolute right-0'
                        />
                    </div>

                    <AISpeechInput
                        inputName="title"
                        captureSpeech={captureSpeech}
                        enableListening={enableListening}
                        setEnableListening={setEnableListening}
                    />
                </div>
            </div>
            <div className='flex item-start gap-2'>
                <div className='mb-5'>
                    <label
                        htmlFor="todo-dueDate"
                        className="block mb-2.5 text-sm font-medium text-heading">
                        Due Date
                    </label>

                    <div className="flex items-start gap-2">
                        <div className='w-full relative'>
                            <input
                                id="todo-dueDate"
                                name="dueDate"
                                type='date'
                                value={todoForm.dueDate}
                                placeholder="Todo dueDate"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="flex-1 w-full rounded-lg border border-gray-300 text-heading text-sm px-3 py-2.5"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor="todo-priority"
                        className="block mb-2.5 text-sm font-medium text-heading">
                        Priority
                    </label>

                    <div className="flex items-start gap-2">
                        <div className='w-full relative'>
                            <select
                                id='priority'
                                name='priority'
                                value={todoForm.priority}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className='flex-1 rounded-lg border border-gray-300 text-heading text-sm px-3 py-2.5'
                            >   <option key="1234">--Select--</option>
                                {
                                    TodoPriorityOption.length > 0 && TodoPriorityOption.map(option => {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
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
