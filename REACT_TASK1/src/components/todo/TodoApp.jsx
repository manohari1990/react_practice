// Should own the states

import { useEffect, useState } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import TodoFilters from './TodoFilters'
import TodoPagination from './TodoPagination'
import { sortedList, buildPagination } from '../../utils/helpers'
import { RecordsPerPage, INITIAL_TODO_FORM } from '../../utils/Constants'


function TodoApp() {

    const localTodos = localStorage.getItem('todoItems')
    const savedTodos = localTodos != null ? JSON.parse(localTodos) : []  // !!! can be improved lazy initialization !!!
    // const [input, setInput] = useState('')

    const [todoForm, setTodoForm] = useState(INITIAL_TODO_FORM);

    const [todoItems, setTodoItems] = useState(savedTodos)
    const [isUpdate, setIsUpdate] = useState(false)
    const [selectedUpdateId, setSelectedUpdateId] = useState(null)
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [seletedSortOption, setSeletedSortOption] = useState('newest')
    const [pageNumber, setPageNumber] = useState(1)


    let filteredTodos = todoItems.length > 0 ?
        (filter === 'all')
            ? todoItems
            : todoItems.filter(todo => {
                if (todo.status === filter) return todo
            }) : []
    const lowerSearchText = search.trim().toLowerCase()
    filteredTodos = filteredTodos.filter((todo) => { return todo.title.toLowerCase().includes(lowerSearchText) || todo.details.toLowerCase().includes(lowerSearchText) })
    filteredTodos = sortedList(filteredTodos, seletedSortOption) // Basic Sort

    const totalPages = Math.ceil(filteredTodos.length / RecordsPerPage)

    const startIndex = (pageNumber > totalPages ? (pageNumber - 1) - 1 : pageNumber - 1) * RecordsPerPage
    const endIndex = startIndex + RecordsPerPage
    const paginatedTodo = filteredTodos.slice(startIndex, endIndex)

    useEffect(() => {
        const stringifyTodo = JSON.stringify(todoItems)
        localStorage.setItem('todoItems', stringifyTodo)
    }, [todoItems])

    const displayPages = buildPagination(pageNumber, totalPages)

    const handleAddTodo = () => {

        if (todoForm.title.trim() === '') return;
        let newTodo = {
            'id': Date.now(),
            'title': todoForm.title,
            'details': todoForm.details,
            'status': 'active',
            'createdAt': Date.now()
        }
        setTodoItems((prev) => {
            return [newTodo, ...prev]
        })
        setTodoForm(INITIAL_TODO_FORM)
    }

    const handleDelete = (id) => {
        const filteredList = todoItems.filter(item => item.id !== id)
        setTodoItems(filteredList)
        const newPageTotal = Math.ceil(filteredList.length / RecordsPerPage)
        if (pageNumber > newPageTotal) {
            setPageNumber(pageNumber - 1)
        }
    }

    const handleEdit = (id) => {
        const todo = todoItems.find(todo => todo.id === id)
        if (!todo) return;
        setSelectedUpdateId(todo.id)
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
            return id === todo.id
                ? {
                    ...todo,
                    'status': status ? 'completed' : 'active'
                } :
                todo
        })
        setTodoItems(updatedList)
    }

    const handleUpdateItem = () => {
        if (todoForm.title.trim() === '') return;
        const updatedList = todoItems.map(todo => {
            return selectedUpdateId === todo.id
                ? {
                    ...todo,
                    'title': todoForm.title,
                    'details': todoForm.details
                } :
                todo
        })
        setTodoItems(updatedList)
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

    const handleFilter = (selectedLabel) => {
        setFilter(selectedLabel)
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
        <div>
            <TodoFilters
                handleFilter={handleFilter}
                activeFilter={filter}
                handleSearch={handleSearch}
                seletedSortOption={seletedSortOption}
                handleSort={handleSort}
            />
            <TodoInput
                todoForm={todoForm}
                handleAddTodo={handleAddTodo}
                handleUpdateItem={handleUpdateItem}
                handleCancelUpdate={handleCancelUpdate}
                handleInputChange={handleInputChange}
                isUpdate={isUpdate}
            />
            <TodoList
                filteredTodos={paginatedTodo}
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
    )
}

export default TodoApp