function Spinner(){
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
            <div role="status" className="relative animate-spin w-4 h-4 rounded-full bg-blue-500">
                <div className="absolute left-[-1.5rem] w-4 h-4 bg-slate-900 rounded-full dark:bg-slate-50"></div>
                <div className="absolute right-[-1.5rem] w-4 h-4 bg-slate-900 rounded-full dark:bg-slate-50"></div>
                <span className="sr-only">Loading…</span>
            </div>
        </div>
    )
}

export default Spinner;