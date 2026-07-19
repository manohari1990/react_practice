// Responsible only for listing all todo items
import TodoItem from "./TodoItem"

function TodoList({ filteredTodos, list, handleDelete, handleEdit, handleStatus }) {
    return (
        <div className="pad_5">
            {list.length === 0 && <div>No Records Found!</div>}
            {filteredTodos.length > 0
                ? filteredTodos.map((item) => {
                    return <TodoItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} handleStatus={handleStatus} />
                })
                : list.length > 0 && list.map((item) => {
                    return <TodoItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} handleStatus={handleStatus} />
                })}
        </div>
    )
}

export default TodoList