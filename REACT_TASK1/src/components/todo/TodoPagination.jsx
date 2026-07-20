
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