export const TodoFilterLabels = [
    {
        'label': 'All',
        'value': 'all'
    },
    {
        'label': 'Completed',
        'value': 'completed'
    },
    {
        'label': 'Active',
        'value': 'active'
    }
]

export const SortingLabels = [
    {
        'label': 'Newest',
        'value': 'newest'
    },
    {
        'label': 'Oldest',
        'value': 'oldest'
    },
    {
        'label': 'A-Z',
        'value': 'a-z'
    },
    {
        'label': 'Z-A',
        'value': 'z-a'
    }
]

export const RecordsPerPage = 10
export const MODEL_NAME = "gemini-3.6-flash";
export const INITIAL_TODO_FORM  = {
    id: "",
    title: "",
    details: "",
    status: 'active',
    createdAt: ''
}