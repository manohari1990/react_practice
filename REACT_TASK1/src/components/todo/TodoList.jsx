// Responsible only for listing all todo items
import TodoItem from "./TodoItem"

function TodoList ({list, handleDelete, handleEdit}) {
    return(
        <div className="pad_5">
            {list.length > 0 && list.map((item)=>{
                return <TodoItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} />
            })}
        </div>
    )
}

export default TodoList