// Responsible only for listing all todo items
import TodoItem from "./TodoItem"

function TodoList({ filteredTodos, handleDelete, handleEdit, handleStatus }) {
    console.log(filteredTodos, "List")
    return (
        <div className="pad_5">
            {filteredTodos.length === 0 && <div>No Records Found!</div>}
            {filteredTodos.length > 0 && filteredTodos.map((item) => {
                return <TodoItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} handleStatus={handleStatus} />
            })}
        </div>
    )
}

export default TodoList