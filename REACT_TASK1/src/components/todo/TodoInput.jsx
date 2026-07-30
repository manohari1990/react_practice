// Responsible only for
// input, Add button

import { useState } from 'react'
import AISpeechInput from './AISpeechInput'
import AIInput from './AIInput'
import { TodoPriorityOption, TodoStatusOptions } from '../../utils/Constants'

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
                <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 relative px-2">
                        {/* <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div> */}
                        <input
                            id="todo-title"
                            name="title"
                            value={todoForm.title}
                            placeholder="Todo Title"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                        <AIInput
                            inputName="title"
                            input={todoForm.title}
                            context={"improveTodo"}
                            onAccept={handleInputChange}
                            htmlClass='flex items-center pr-1 focus-within:relative'
                        />

                    </div>
                </div>
                {/* <AISpeechInput
                        inputName="title"
                        captureSpeech={captureSpeech}
                        enableListening={enableListening}
                        setEnableListening={setEnableListening}
                    /> */}
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="todo-title"
                    className="block mb-2.5 text-sm font-medium text-heading">
                    Todo Details
                </label>

                <div className="mt-2">
                    <div className="flex items-start rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 relative px-2">
                        <textarea
                            placeholder='Todo Details'
                            value={todoForm.details}
                            className="block grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            name='details'
                            cols={25}
                            rows={2}
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
                            htmlClass='flex items-center pr-1 focus-within:relative'
                        />
                    </div>

                    {/* <AISpeechInput
                        inputName="title"
                        captureSpeech={captureSpeech}
                        enableListening={enableListening}
                        setEnableListening={setEnableListening}
                    /> */}
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='mb-5'>
                    <label
                        htmlFor="todo-title"
                        className="block mb-2.5 text-sm font-medium text-heading">
                        Due Date
                    </label>

                    <div className="mt-2">
                        <div className="flex items-start rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 relative px-2">
                            <input
                                id="todo-due_date"
                                name="due_date"
                                type='date'
                                min={!isUpdate ? (new Date().toISOString().split("T")[0]).toString() : todoForm.due_date}
                                value={todoForm.due_date}
                                placeholder="Todo Due Date"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor="todo-title"
                        className="block mb-2.5 text-sm font-medium text-heading">
                        Priority
                    </label>

                    <div className="mt-2">
                        <div className="flex items-start rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 relative px-2">
                            <select
                                id='priority'
                                name='priority'
                                value={todoForm.priority}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
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
                <div className='mb-5'>
                    <label
                        htmlFor="todo-title"
                        className="block mb-2.5 text-sm font-medium text-heading">
                        Status
                    </label>

                    <div className="mt-2">
                        <div className="flex items-start rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 relative px-2">
                            <select
                                id='status'
                                name='status'
                                value={todoForm.status}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
                            >   <option key="status1">--Select--</option>
                                {
                                    TodoStatusOptions.length > 0 && TodoStatusOptions.map(option => {
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
