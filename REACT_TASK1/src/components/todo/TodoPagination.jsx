/*
Edge Case 10 - it should handle but with fail safe.. if the 5000 is not exists then should not break UI - need to work on
*/


function TodoPagination({ currentPage, totalPages, handlePage, displayPages }) {
    return (
        <nav aria-label="Pagination" className="flex space-x-4 justify-center mt-8">
            {
                displayPages.length > 0 && (
                    <>
                        <button
                            aria-disabled={currentPage === 1}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className={`flex items-center justify-center shrink-0 bg-gray-200 w-9 h-9 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-800 dark:text-slate-50 dark:hover:bg-neutral-700 ${currentPage === 1 ? 'bg-gray-100 cursor-default' : ''}`}
                            onClick={() => handlePage(currentPage - 1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="fill-slate-600 size-3 rotate-180 overflow-visible dark:fill-slate-600" viewBox="0 0 451.846 451.847"
                                aria-hidden="true">
                                <path
                                    d="M345.441 248.292 151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
                                    data-original="#000000" />
                            </svg>
                        </button>
                        {
                            displayPages.map((page, index) => {
                                if (page === '...') return <span key={`ellipse-${index}`}>...</span>
                                else return <button
                                    key={page}
                                    onClick={() => handlePage(page)}
                                    aria-current="page"
                                    className="flex items-center justify-center shrink-0 text-sm font-semibold text-white w-9 h-9 rounded-md bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"> {page} </button>
                            })
                        }
                        <button
                            aria-label="Next page"
                            onClick={() => handlePage(currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                            disabled={currentPage === totalPages}
                            className={`flex items-center justify-center shrink-0 bg-gray-200 w-9 h-9 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-800 dark:text-slate-50 dark:hover:bg-neutral-700 ${currentPage === totalPages ? 'bg-gray-100 cursor-default' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-600 size-3 overflow-visible dark:fill-slate-50"
                                viewBox="0 0 451.846 451.847" aria-hidden="true">
                                <path
                                    d="M345.441 248.292 151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
                                    data-original="#000000" />
                            </svg>
                        </button>
                    </>
                )
            }
        </nav>
    )
}

export default TodoPagination