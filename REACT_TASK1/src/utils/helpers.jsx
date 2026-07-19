export function sortedList(list, seletedSortOption){
    switch(seletedSortOption){
        case 'newest':
            list.sort((a,b)=> b.id-a.id)
            break;
        case 'oldest':
            list.sort((a,b)=> a.id-b.id)
            break;
        case 'a-z':
            list.sort((a,b) => a.value.localeCompare(b.value))
            break;
        case 'z-a':
            list.sort((a,b) => b.value.localeCompare(a.value))
            break;
        default:
            break;
    }

    return list
    
}