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
        'label': 'Backlog',
        'value': 'pending'
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

export const TodoPriorityFilter = [
    {
        'label': 'All',
        'value': 'all'
    },
    {
        'label': 'High',
        'value': 'high'
    },
    {
        'label': 'Medium',
        'value': 'medium'
    },
    {
        'label': 'Low',
        'value': 'low'
    },
]

export const TodoPriorityOption = [
    {
        'label': 'High',
        'value': 'high'
    },
    {
        'label': 'Medium',
        'value': 'medium'
    },
    {
        'label': 'Low',
        'value': 'low'
    },
]

export const RECORDS_PER_PAGE = 10
export const MODEL_NAME = "gemini-3.6-flash";
export const INITIAL_TODO_FORM  = {
    todo_id: "",
    title: "",
    details: "",
    priority: "",
    status: 'pending',
    due_date:'',
}