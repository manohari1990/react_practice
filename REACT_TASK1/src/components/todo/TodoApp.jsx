// Should own the states

import { useEffect, useState } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import TodoFilters from './TodoFilters'
import TodoPagination from './TodoPagination'
import { sortedList, buildPagination, buildQueryParams } from '../../utils/helpers'
import { RECORDS_PER_PAGE, INITIAL_TODO_FORM } from '../../utils/Constants'
import { getAllTodos, saveTodo, updateTodo, deleteTodoByID } from '../../services/todoService'
import ConfirmDelete from "./ConfirmDelete"
import Spinner from "../Spinner"

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
    const [confirmDel, setConfirmDel] = useState(null)
    const [fetchedApiDetails, setFetchedApiDetails] = useState(null)
    
    const loadTodos = async (params) => {
        setLoading(true)
        try {
            const response = await getAllTodos(params)
            if(response.success) {
                setFetchedApiDetails(response)
                setTodoItems(response.records)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTodos(buildQueryParams(search, seletedSortOption, filter, pageNumber))
    }, [search, seletedSortOption, filter, pageNumber])

    const totalPages = (fetchedApiDetails) ? Math.ceil(parseInt(fetchedApiDetails.totalRecords) / RECORDS_PER_PAGE) : 0
    const startIndex = (pageNumber > totalPages ? (pageNumber - 1) - 1 : pageNumber - 1) * RECORDS_PER_PAGE
    const endIndex = startIndex + RECORDS_PER_PAGE
    const displayPages = buildPagination(pageNumber, totalPages)

    const handleAddTodo = async() => {
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

    const handleDelete = async() => {
        setLoading(true)
        try {
            const resposne = await deleteTodoByID(confirmDel)
            if (resposne.success) {
                loadTodos(buildQueryParams(search, seletedSortOption, filter, pageNumber))
            } else {
                setHttpError("Try Again!")
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            setConfirmDel(null)
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

    const handleStatus = async (status, id) => {
        setLoading(true)
        const updatedItem = todoItems.find((todo => todo.todo_id === id))
        try {
            const response = await updateTodo(id, { 'status': status ? 'completed' : 'pending' })
            if (response.success) {
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
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }

    }

    const handleUpdateItem = async () => {
        if (todoForm.title.trim() === '') return;
        setLoading(true)
        try {
            const updatedStatus = {
                'title': todoForm.title,
                'details': todoForm.details,
                'due_date': todoForm.due_date,
                'priority': todoForm.priority,
                'status': todoForm.status
            }
            const res = await updateTodo(selectedUpdateId, updatedStatus)
            if(res.success){
                const updatedList = todoItems.map(todo => {
                    return todoForm.todo_id === todo.todo_id
                        ? {
                            ...todo,
                            ...updatedStatus
                        } : todo
                })
                setTodoItems(updatedList)
            }
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
            {loading && <Spinner /> }
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
                    filteredTodos={todoItems}
                    handleDelete={(id)=>setConfirmDel(id)}
                    handleEdit={handleEdit}
                    handleStatus={handleStatus}
                />
                <TodoPagination
                    currentPage={pageNumber}
                    totalPages={totalPages}
                    handlePage={handlePage}
                    displayPages={displayPages}
                />
                {confirmDel && <ConfirmDelete deleteConfirmed={handleDelete} setConfirmDelete={setConfirmDel} />  }
            </div>
        </div>
    )
}

export default TodoApp