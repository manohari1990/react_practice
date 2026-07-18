// Responsible only for
// input, Add button

function TodoInput({input, handleAddTodo, handleUpdateItem, handleCancelUpdate, handleInputChange, isUpdate}) {
    console.log(isUpdate, "Input")
    return(
        <div className="row_content">
            <div>
                <input placeholder="Enter your todo item" className="primary__input" value={input} onChange={(e)=> handleInputChange(e.target.value)}/>{isUpdate && <button className="primary__button" onClick={handleCancelUpdate}>X</button>}
            </div>
            {!isUpdate ? <button className="primary__button" onClick={handleAddTodo}>Add</button> : <button className="primary__button" onClick={handleUpdateItem}>Update</button>}
            
        </div>
    )
}

export default TodoInput