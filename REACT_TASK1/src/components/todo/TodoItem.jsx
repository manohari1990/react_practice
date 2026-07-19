// Responsible only for displaying each item

function TodoItem({item, handleDelete, handleEdit, handleStatus}){
    return (
        <div id={item.id} key={item.id} className="pad_5 row_content justify_content height_2">
            <input type="checkbox" className="primary__border" checked={item.status == 'completed'} onClick={(e)=>handleStatus(e.target.checked, item.id)} />
            <p>{item.value}</p>
            <button className="primary__button" onClick={()=>handleEdit(item.id)}>✏️</button>
            <button className="primary__button" onClick={()=>handleDelete(item.id)}>🗑</button>
        </div>
    )
}

export default TodoItem