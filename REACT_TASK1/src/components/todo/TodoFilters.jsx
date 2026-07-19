// Todo Filter controls
import {TodoFilterLabels, SortingLabels} from '../../utils/Constants'

function TodoFilters ({handleFilter, activeFilter, search, handleSearch, seletedSortOption, handleSort}){
    return(
        <div className="row_content">
            <select id='sort_list' name='sort_list' value={seletedSortOption} onChange={(e)=>handleSort(e.target.value)}>
                {
                    SortingLabels.length > 0 && SortingLabels.map(obj=>{
                        return <option key={obj.value} value={obj.value}>{obj.label}</option>
                    })
                }
            </select>
            {
                TodoFilterLabels.length > 0 ?
                    TodoFilterLabels.map(obj=>{
                        return <button key={obj.value} className={`primary__button ${activeFilter === obj.value ? 'active' : ''}`} onClick={()=>handleFilter(obj.value)}>{obj.label}</button>
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