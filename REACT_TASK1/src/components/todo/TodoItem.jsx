// Responsible only for displaying each item

function TodoItem({ todo, handleDelete, handleEdit, handleStatus }) {
    return (

        <tr id={todo.todo_id} key={todo.todo_id} className="has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-blue-900/10">
            <td className="w-8 pl-3 py-4">
                <label className="group has-[input:checked]:text-slate-900 inline-block">
                    <input type="checkbox" className="sr-only row-checkbox" checked={todo.status == 'completed'} onChange={(e) => handleStatus(e.target.checked, todo.todo_id)} />
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
            </td>
            <td className="px-3 py-4 font-medium text-slate-900 dark:text-slate-50 whitespace-nowrap">{todo.title}</td>
            <td className="px-3 py-4 text-slate-500 dark:text-slate-400"> {todo.details}</td>
            <td className="px-3 py-4 text-slate-500 dark:text-slate-400">{todo.priority}</td>
            <td className="px-3 py-4 text-slate-500 dark:text-slate-400">{todo.due_date}</td>
            <td className="px-3 py-4 flex gap-3">
                <button
                    type="button"
                    onClick={() => handleEdit(todo.todo_id)}
                    className="text-sm text-blue-700 dark:text-blue-500 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    aria-label={`Edit ${todo.title}`}>
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => handleDelete(todo.todo_id)}
                    className="text-sm text-red-700 dark:text-red-500 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                    aria-label={`Delete ${todo.title}`}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default TodoItem