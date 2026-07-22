/*
Edge Case 10 - it should handle but with fail safe.. if the 5000 is not exists then should not break UI - need to work on
*/


function TodoPagination({currentPage, totalPages, handlePage, displayPages}){
    return(
        <div className="row_content">
            {
                displayPages.length > 0 && (
                    <>
                        <button className={`primary__button`} onClick={()=>handlePage(currentPage-1)} disabled={currentPage===1}>Prev</button>
                        {
                            displayPages.map((page, index)=>{
                                if (page === '...') return <span  key={`ellipse-${index}`}>...</span>
                                else return <button className={`primary__button ${currentPage == page ? 'active' : ''}`} key={page} onClick={()=>handlePage(page)}>{page}</button>
                            })
                        }
                        <button className={`primary__button`} onClick={()=>handlePage(currentPage+1)} disabled={currentPage===totalPages}>Next</button>
                    </>
                )
            }
        </div>
    )
}

export default TodoPagination