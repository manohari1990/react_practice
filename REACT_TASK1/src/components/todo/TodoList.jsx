// Responsible only for listing all todo items
import { RECORDS_PER_PAGE } from "../../utils/Constants"
import TodoItem from "./TodoItem"
import TodoListSkeleton from "./TodoListSkeleton"

function TodoList({ filteredTodos, handleDelete, handleEdit, handleStatus, isLoading }) {
    return (
        <div className="overflow-x-auto px-4 md:px-8 mt-6">
            {filteredTodos.length > 0 ?
                <table className="w-full max-w-7xl mx-auto">
                    <thead
                        className="text-slate-900 dark:text-slate-50 text-left text-sm font-semibold border-b border-slate-300 dark:border-neutral-600 whitespace-nowrap">
                        <tr>
                            <th scope="col" aria-sort="none" className="w-8 pl-3 py-3.5">
                                <label className="group has-[input:checked]:text-slate-900 inline-block">
                                    <input type="checkbox" className="sr-only" id="master-checkbox" />
                                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-700
                                 bg-white dark:bg-neutral-800
                                 group-has-[input:checked]:bg-blue-600
                                 group-has-[input:checked]:outline-blue-600
                                 group-focus-within:outline-2
                                 group-focus-within:outline-blue-600" aria-hidden="true">

                                        <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10"
                                            fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 5l3 3 7-7" />
                                        </svg>
                                    </span>
                                </label>
                            </th>
                            <th scope="col" aria-sort="none" className="px-3 py-3.5">
                                <button type="button" className="flex items-center gap-1 cursor-pointer" aria-label="Sort by title">
                                    Title
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-3 fill-slate-400" viewBox="0 0 64 64"
                                        aria-hidden="true">
                                        <path
                                            d="M15.99 28.58h32.02c1.964.073 3.15-2.443 1.81-3.9L33.81 6.08c-.904-1.096-2.716-1.098-3.62 0l-16.01 18.6c-1.334 1.455-.16 3.975 1.81 3.9m32.02 6.84H15.99c-1.964-.073-3.15 2.443-1.81 3.9l16.01 18.6c.904 1.096 2.716 1.098 3.62 0l16.01-18.6c1.334-1.455.16-3.975-1.81-3.9" />
                                    </svg>
                                </button>
                            </th>
                            <th scope="col" aria-sort="none" className="px-3 py-3.5">
                                <button type="button" className="flex items-center gap-1 cursor-pointer" aria-label="Sort by details">
                                    Details
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-3 fill-slate-400" viewBox="0 0 64 64"
                                        aria-hidden="true">
                                        <path
                                            d="M15.99 28.58h32.02c1.964.073 3.15-2.443 1.81-3.9L33.81 6.08c-.904-1.096-2.716-1.098-3.62 0l-16.01 18.6c-1.334 1.455-.16 3.975 1.81 3.9m32.02 6.84H15.99c-1.964-.073-3.15 2.443-1.81 3.9l16.01 18.6c.904 1.096 2.716 1.098 3.62 0l16.01-18.6c1.334-1.455.16-3.975-1.81-3.9" />
                                    </svg>
                                </button>
                            </th>
                            <th scope="col" aria-sort="none" className="px-3 py-3.5">
                                <button type="button" className="flex items-center gap-1 cursor-pointer" aria-label="Sort by priority">
                                    Priority
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-3 fill-slate-400" viewBox="0 0 64 64"
                                        aria-hidden="true">
                                        <path
                                            d="M15.99 28.58h32.02c1.964.073 3.15-2.443 1.81-3.9L33.81 6.08c-.904-1.096-2.716-1.098-3.62 0l-16.01 18.6c-1.334 1.455-.16 3.975 1.81 3.9m32.02 6.84H15.99c-1.964-.073-3.15 2.443-1.81 3.9l16.01 18.6c.904 1.096 2.716 1.098 3.62 0l16.01-18.6c1.334-1.455.16-3.975-1.81-3.9" />
                                    </svg>
                                </button>
                            </th>
                            <th scope="col" aria-sort="none" className="px-3 py-3.5">
                                <button type="button" className="flex items-center gap-1 cursor-pointer" aria-label="Sort by due_date">
                                    Due Date
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-3 fill-slate-400" viewBox="0 0 64 64"
                                        aria-hidden="true">
                                        <path
                                            d="M15.99 28.58h32.02c1.964.073 3.15-2.443 1.81-3.9L33.81 6.08c-.904-1.096-2.716-1.098-3.62 0l-16.01 18.6c-1.334 1.455-.16 3.975 1.81 3.9m32.02 6.84H15.99c-1.964-.073-3.15 2.443-1.81 3.9l16.01 18.6c.904 1.096 2.716 1.098 3.62 0l16.01-18.6c1.334-1.455.16-3.975-1.81-3.9" />
                                    </svg>
                                </button>
                            </th>
                            <th scope="col" className="px-3 py-3.5">Actions</th>
                        </tr>
                    </thead>
                     {
                     isLoading 
                        ?  <tbody className="rounded-lg p-4 animate-pulse">
                            {
                                Array.from({length:RECORDS_PER_PAGE}).map((_, index)=> {
                                    return  <TodoListSkeleton key={index}/>
                                })
                            }</tbody>
                        : <tbody className="text-sm divide-y divide-slate-200 dark:divide-neutral-700">
                            {filteredTodos.length > 0 && filteredTodos.map((todo) => {
                                return <TodoItem
                                    isLoading={isLoading}
                                    key={todo.todo_id}
                                    todo={todo}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    handleStatus={handleStatus}
                                />
                            })}
                        </tbody>
                    }
                </table>
                : <div className="flex items-center justify-center p-5 m-5">No Records Found!</div>
            }
        </div>
    )
}

export default TodoList