// Responsible only for listing all todo items
import TodoItem from "./TodoItem"

function TodoList({ filteredTodos, handleDelete, handleEdit, handleStatus }) {
    return (
        <div className="pad_5">
            {filteredTodos.length === 0 && <div>No Records Found!</div>}
            {filteredTodos.length > 0 && filteredTodos.map((todo) => {
                return <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    handleDelete={handleDelete} 
                    handleEdit={handleEdit} 
                    handleStatus={handleStatus} 
                />
            })}
        </div>
    )
}

export default TodoList