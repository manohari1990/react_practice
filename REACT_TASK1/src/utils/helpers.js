export function sortedList(list, seletedSortOption) {
    switch (seletedSortOption) {
        case 'newest':
            list.sort((a, b) => b.id - a.id)
            break;
        case 'oldest':
            list.sort((a, b) => a.id - b.id)
            break;
        case 'a-z':
            list.sort((a, b) => a.title.localeCompare(b.title))
            break;
        case 'z-a':
            list.sort((a, b) => b.title.localeCompare(a.title))
            break;
        default:
            break;
    }
    return list
}

export function buildPagination(currentPage, totalPages) {
    const pageList = [
        1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        totalPages
    ];
    const uniquePageList = sortedList(pageList.filter(page => page >= 1 && page <= totalPages), 'oldest')
    const visiblePages = [...new Set(uniquePageList)]

    const displayPages = []
    for (let i = 0; i < visiblePages.length; i++) {
        const current = visiblePages[i]
        const next = visiblePages[i + 1]

        displayPages.push(current)
        //compare current and next here
        const gap = next - current
        if (gap > 2) {
            displayPages.push('...')
        } else if (gap === 2) {
            displayPages.push(current + 1)
        }
    }
    return displayPages
}

