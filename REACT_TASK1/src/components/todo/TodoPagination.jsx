/*
Edge Case 7 - <Prev> 1 2 3 .... 10 11<Next> - Need to work on
Edge Case 8 - the next should not be shown if the user is already on last page- need to work on
Edge Case 9 - the prev should not be shown if the user is already on page 1- need to work on
Edge Case 10 - it should handle but with fail safe.. if the 5000 is not exists then should not break UI - need to work on
*/


function TodoPagination({currentPage, handlePage, displayPages}){
    return(
        <div className="row_content">
        {
            displayPages.length > 0 && displayPages.map((i, index)=>{
                if (i === '...') return <span  key={`ellipse-${index}`}>...</span>
                else return <button className={`primary__button ${currentPage == i ? 'active' : ''}`} key={i} onClick={()=>handlePage(i)}>{i}</button>
            })
        }
        {
            displayPages.length === 0 && <div>No Todos Yet!</div>
        }
        </div>
        
    )
}

export default TodoPagination