// Todo Filter controls

function TodoFilters ({filteredTodos, todoFilterLabels, handleFilter, activeFilter}){
    console.log(activeFilter)
    return(
        <div className="row_content">
            {
                todoFilterLabels.length > 0 ?
                    todoFilterLabels.map(obj=>{
                        return <button className={`primary__button ${activeFilter === obj.value ? 'active' : ''}`} onClick={()=>handleFilter(obj.value)}>{obj.label}</button>
                    })
                    
                :''
            }
        </div>
    )
}

export default TodoFilters