
function TodoListSkeleton() {
    return (
        <tr className=" rounded mb-3 border-b border-slate-100">
            <td className="pl-3 py-4">
                <div className="h-4 w-4 rounded bg-slate-200"></div>
            </td>
            <td className="px-3 py-4">
                <div className="h-4 w-50 rounded bg-slate-200"></div>
            </td>
            <td className="px-3 py-4">
                <div className="space-y-2 w-55">
                    <div className="h-3 w-full rounded bg-slate-200"></div>
                    <div className="h-3 w-3/4 rounded bg-slate-200"></div>
                </div>
            </td>
            <td className="px-3 py-4">
                <div className="h-6 w-6 rounded-full bg-slate-200"></div>
            </td>
            <td className="px-3 py-4">
                <div className="h-4 w-6 rounded bg-slate-200"></div>
            </td>
            <td className="px-3 py-4">
                <div className="flex gap-3">
                    <div className="h-8 w-8 rounded bg-slate-200"></div>
                    <div className="h-8 w-8 rounded bg-slate-200"></div>
                </div>
            </td>
        </tr>
    )
}
export default TodoListSkeleton