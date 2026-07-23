// Responsible only for displaying each item

function TodoItem({todo, handleDelete, handleEdit, handleStatus}){
    return (
        <div id={todo.id} key={todo.id} className="pad_5 row_content justify_content height_2">
            <input type="checkbox" className="primary__border" checked={todo.status == 'completed'} onChange={(e)=>handleStatus(e.target.checked, todo.id)} />
            <p>{todo.title}</p>
            <p>{todo.details}</p>
            <button className="primary__button" onClick={()=>handleEdit(todo.id)}>✏️</button>
            <button className="primary__button" onClick={()=>handleDelete(todo.id)}>🗑</button>
        </div>
    )
}

export default TodoItem