/*
Edge Case 4 - What should happen? - it should navigate to previous page that is , page 3 - that I need to work on.
Edge Case 5 - pagination should not visible, coz there is no use of it and it occupies space unneccessarily. even if we show it must be disabled to better to not to show to avoid user confusion. "why that 1 is there" - need to work on
Edge Case 6 - not at all - need to work on
Edge Case 7 - <Prev> 1 2 3 .... 10 11<Next> - Need to work on
Edge Case 8 - the next should not be shown if the user is already on last page- need to work on
Edge Case 9 - the prev should not be shown if the user is already on page 1- need to work on
Edge Case 10 - it should handle but with fail safe.. if the 5000 is not exists then should not break UI - need to work on
*/


function TodoPagination({currentPage, totalPages, handlePage}){
    const pageList = []
    for (let i = 1; i <= totalPages; i++){
        pageList.push(<button className={`primary__button ${currentPage == i ? 'active' : ''}`} key={i} onClick={()=>handlePage(i)}>{i}</button>)
    }
    return(
        <div className="row_content">
            {pageList}
        </div>
    )
}

export default TodoPagination