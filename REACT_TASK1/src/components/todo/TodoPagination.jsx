/*
Edge Case 10 - it should handle but with fail safe.. if the 5000 is not exists then should not break UI - need to work on
*/


function TodoPagination({currentPage, totalPages, handlePage, displayPages}){
    return(
        <div className="flex w-full justify-center gap-2">
            {
                displayPages.length > 0 && (
                    <>
                        <button className={`rounded-lg px-4 py-2 bg-gray-900 text-gray-100`} onClick={()=>handlePage(currentPage-1)} disabled={currentPage===1}>Prev</button>
                        {
                            displayPages.map((page, index)=>{
                                if (page === '...') return <span  key={`ellipse-${index}`}>...</span>
                                else return <button className={`rounded-lg px-4 py-2 text-gray-100 ${currentPage == page ? 'border-2 border-gray-900 text-gray-900' : 'bg-gray-900'}`} key={page} onClick={()=>handlePage(page)}>{page}</button>
                            })
                        }
                        <button className={`rounded-lg px-4 py-2 bg-gray-900 text-gray-100`} onClick={()=>handlePage(currentPage+1)} disabled={currentPage===totalPages}>Next</button>
                    </>
                )
            }
        </div>
    )
}

export default TodoPagination