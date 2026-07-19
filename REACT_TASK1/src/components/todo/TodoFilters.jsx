// Todo Filter controls
import TodoFilterLabels from '../../Constants'

function TodoFilters ({handleFilter, activeFilter, search, handleSearch}){
    return(
        <div className="row_content">

            {
                TodoFilterLabels.length > 0 ?
                    TodoFilterLabels.map(obj=>{
                        return <button className={`primary__button ${activeFilter === obj.value ? 'active' : ''}`} onClick={()=>handleFilter(obj.value)}>{obj.label}</button>
                    })
                :''
            }
            <div>
                <input className='primary__border height_2' type="text" placeholder="Enter search text" value={search} onChange={(e)=>handleSearch(e.target.value)} />
            </div>
        </div>
    )
}

export default TodoFilters