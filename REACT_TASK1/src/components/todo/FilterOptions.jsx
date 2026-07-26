
function FilterOptions({filterLabels, activeFilter, handleFilter, filterBy}){
    return(
            filterLabels.length > 0 ?
                filterLabels.map(obj => {
                    return <button key={obj.value} className={`rounded-lg px-4 py-2 text-gray-100 ${activeFilter === obj.value ? 'border-2 border-gray-900 text-gray-900' : 'bg-gray-900'}`} onClick={() => handleFilter(filterBy, obj.value)}>{obj.label}</button>
                })
                : ''
 
    )
}

export default FilterOptions