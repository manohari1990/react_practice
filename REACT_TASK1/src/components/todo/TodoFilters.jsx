// Todo Filter controls
import { TodoFilterLabels, SortingLabels } from '../../utils/Constants'

function TodoFilters({ handleFilter, activeFilter, search, handleSearch, seletedSortOption, handleSort }) {
    return (
        <div className="mb-1 p-5">
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <select 
                        id='sort_list' 
                        name='sort_list' 
                        value={seletedSortOption} 
                        onChange={(e) => handleSort(e.target.value)}
                        className='flex-1 rounded-lg border border-gray-300 text-heading text-sm px-3 py-2.5'
                    >
                        {
                            SortingLabels.length > 0 && SortingLabels.map(obj => {
                                return <option key={obj.value} value={obj.value}>{obj.label}</option>
                            })
                        }
                    </select>
                    {
                        TodoFilterLabels.length > 0 ?
                            TodoFilterLabels.map(obj => {
                                return <button key={obj.value} className={`rounded-lg px-4 py-2 bg-gray-900 text-gray-100 ${activeFilter === obj.value ? 'active' : ''}`} onClick={() => handleFilter(obj.value)}>{obj.label}</button>
                            })
                            : ''
                    }
                </div>
                <div>
                    <input className='rounded-lg border-gray-300 border text-heading text-sm px-3 py-2.5' type="text" placeholder="Enter search text" value={search} onChange={(e) => handleSearch(e.target.value)} />
                </div>
            </div>
            
        </div>
    )
}

export default TodoFilters