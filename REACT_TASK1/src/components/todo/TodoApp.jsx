// Should own the states

import { useEffect, useState } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import TodoFilters from './TodoFilters'
import TodoPagination from './TodoPagination'
import { sortedList, buildPagination, buildQueryParams } from '../../utils/helpers'
import { RecordsPerPage, INITIAL_TODO_FORM } from '../../utils/Constants'
import { getAllTodos, saveTodo, updateTodo, deleteTodoByID } from '../../services/todoService'

function TodoApp() {

    const [todoForm, setTodoForm] = useState(INITIAL_TODO_FORM);
    const [loading, setLoading] = useState(false)
    const [todoItems, setTodoItems] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [selectedUpdateId, setSelectedUpdateId] = useState(null)
    const [filter, setFilter] = useState({ priority: 'all', status: 'all' })
    const [search, setSearch] = useState('')
    const [seletedSortOption, setSeletedSortOption] = useState('newest')
    const [pageNumber, setPageNumber] = useState(1)
    const [httpError, setHttpError] = useState('')

    const loadTodos = async (params) => {
        setLoading(true)
        try {
            const response = await getAllTodos(params)
            setTodoItems(response)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTodos(buildQueryParams(search, seletedSortOption, filter))
    }, [search, seletedSortOption, filter])

    let filteredTodos = todoItems.length > 0 ? todoItems.filter(todo => {
        const matchesStatus = filter.status === 'all' || todo.status === filter.status
        const matchesPriority = filter.priority === 'all' || todo.priority === filter.priority
        return matchesStatus && matchesPriority
    }) : []
    const lowerSearchText = search.trim().toLowerCase()
    filteredTodos = filteredTodos.filter((todo) => { return todo.title.toLowerCase().includes(lowerSearchText) || todo.details.toLowerCase().includes(lowerSearchText) })
    filteredTodos = sortedList(filteredTodos, seletedSortOption) // Basic Sort

    const totalPages = Math.ceil(filteredTodos.length / RecordsPerPage)

    const startIndex = (pageNumber > totalPages ? (pageNumber - 1) - 1 : pageNumber - 1) * RecordsPerPage
    const endIndex = startIndex + RecordsPerPage
    const paginatedTodo = filteredTodos.slice(startIndex, endIndex)

    const displayPages = buildPagination(pageNumber, totalPages)

    const handleAddTodo = async () => {
        setLoading(true)
        if (todoForm.title.trim() === '') return;
        let newTodo = {
            'title': todoForm.title,
            'details': todoForm.details,
            'priority': todoForm.priority ? todoForm.priority : 'medium',
            'due_date': todoForm.due_date,
            'status': 'pending',
        }
        try {
            const serverResponse = await saveTodo(newTodo)
            console.log(serverResponse)
            setTodoItems((prev) => {
                return [newTodo, ...prev]
            })
            setTodoForm(INITIAL_TODO_FORM)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }

    }

    const handleDelete = async (id) => {
        setLoading(true)
        try {
            const resposne = await deleteTodoByID(id)
            if (resposne.length > 0) {
                const filteredList = todoItems.filter(item => {
                    console.log(item.todo_id, id)
                    return item.todo_id !== id
                })
                setTodoItems(filteredList)
                const newPageTotal = Math.ceil(filteredList.length / RecordsPerPage)
                if (pageNumber > newPageTotal) {
                    setPageNumber(pageNumber - 1)
                }
            } else {
                setHttpError("Try Again!")
            }

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (id) => {
        const todo = todoItems.find(todo => todo.todo_id === id)
        if (!todo) return;
        setSelectedUpdateId(todo.todo_id)
        setIsUpdate(true)
        setTodoForm({
            ...todo
        })
    }

    const handleCancelUpdate = () => {
        setSelectedUpdateId(null)
        setIsUpdate(false)
        setTodoForm(INITIAL_TODO_FORM)
    }

    const handleStatus = (status, id) => {
        const updatedList = todoItems.map(todo => {
            return id === todo.todo_id
                ? {
                    ...todo,
                    'status': status ? 'completed' : 'pending'
                } :
                todo
        })
        setTodoItems(updatedList)
    }

    const handleUpdateItem = async () => {
        if (todoForm.title.trim() === '') return;
        const updatedList = todoItems.map(todo => {
            return todoForm.todo_id === todo.todo_id
                ? {
                    ...todo,
                    'title': todoForm.title,
                    'details': todoForm.details,
                    'due_date': todoForm.due_date,
                    'priority': todoForm.priority
                } : todo
        })
        console.log(updatedList)
        setTodoItems(updatedList)
        setLoading(true)
        try {
            const res = await updateTodo(selectedUpdateId, {
                'title': todoForm.title,
                'details': todoForm.details,
                'due_date': todoForm.due_date,
                'priority': todoForm.priority,
                'status': todoForm.status
            })
            console.log(res)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        handleCancelUpdate()
    }

    const handleInputChange = (name, value) => {
        setTodoForm((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleFilter = (filterType, selectedLabel) => {
        setFilter(prev => {
            return {
                ...prev,
                [filterType]: selectedLabel
            }
        })
        setPageNumber(1)
    }

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm)
        setPageNumber(1)
    }
    const handleSort = (selectedOption) => {
        setSeletedSortOption(selectedOption)
        setPageNumber(1)
    }

    const handlePage = (selectedPage) => {
        setPageNumber(selectedPage)
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 p-3 text-center">Todo App</h1>
            <hr className="mb-10 mt-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
            <div className="max-w-lg mx-auto">
                <TodoInput
                    todoForm={todoForm}
                    handleAddTodo={handleAddTodo}
                    handleUpdateItem={handleUpdateItem}
                    handleCancelUpdate={handleCancelUpdate}
                    handleInputChange={handleInputChange}
                    isUpdate={isUpdate}
                />
            </div>
            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
            <div className="mx-auto">
                <TodoFilters
                    handleFilter={handleFilter}
                    activeFilters={filter}
                    handleSearch={handleSearch}
                    seletedSortOption={seletedSortOption}
                    handleSort={handleSort}
                />
                <TodoList
                    filteredTodos={[]}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleStatus={handleStatus}
                />
                <TodoPagination
                    currentPage={pageNumber}
                    totalPages={totalPages}
                    handlePage={handlePage}
                    displayPages={displayPages}
                />
            </div>
        </div>
    )
}

export default TodoApp