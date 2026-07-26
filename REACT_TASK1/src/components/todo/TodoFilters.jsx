// Todo Filter controls
import { TodoFilterLabels, SortingLabels, TodoPriorityFilter } from '../../utils/Constants'
import FilterOptions from './FilterOptions.jsx'

function TodoFilters({ handleFilter, activeFilters, search, handleSearch, seletedSortOption, handleSort }) {
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
                    <FilterOptions filterLabels={TodoFilterLabels} activeFilter={activeFilters.status} handleFilter={handleFilter} filterBy={'status'} />
                </div>
                <div className='flex gap-3'>
                    <div className='flex gap-2'>
                        <FilterOptions filterLabels={TodoPriorityFilter} activeFilter={activeFilters.priority} handleFilter={handleFilter} filterBy={'priority'} />
                    </div>
                    <input className='rounded-lg border-gray-300 border text-heading text-sm px-3 py-2.5' type="text" placeholder="Enter search text" value={search} onChange={(e) => handleSearch(e.target.value)} />
                </div>
            </div>
            
        </div>
    )
}

export default TodoFilters