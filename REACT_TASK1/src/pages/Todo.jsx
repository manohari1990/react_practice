import TodoApp from '../components/todo/TodoApp'
import {useAuth} from '../hooks/useAuth';

function Todo(){
    const {logout} = useAuth()
    return (
        <>
            <button type="button" onClick={logout}>Logout</button>
            <TodoApp />
        </>
    )
}

export default Todo