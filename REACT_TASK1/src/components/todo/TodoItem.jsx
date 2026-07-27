// Responsible only for displaying each item

function TodoItem({todo, handleDelete, handleEdit, handleStatus}){
    return (
        <div id={todo.todo_id} key={todo.todo_id}  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
                <div className="font-medium text-gray-900">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" checked={todo.status == 'completed'} onChange={(e)=>handleStatus(e.target.checked, todo.todo_id)} />
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <div className="font-medium text-gray-900">
                    {todo.title}
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <div className="font-medium text-gray-900">
                    {todo.details}
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <div className="font-medium text-gray-900">
                    <span className={`priority ${todo.priority}-priority`}></span>{todo.priority}
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <div className="font-medium text-gray-900">
                    {todo.due_date ? todo.due_date : '-'}
                </div>
            </div>

            <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-500 hover:text-blue-600" onClick={()=>handleEdit(todo.todo_id)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
            <button className="p-1 text-gray-500 hover:text-red-600" onClick={()=>handleDelete(todo.todo_id)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
            </div>
        </div>
    )
}

export default TodoItem