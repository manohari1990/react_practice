import TodoApp from '../components/todo/TodoApp'
import {useAuth} from '../hooks/useAuth';
import {handleLogout} from '../services/authService'

function Todo(){
    const {logout} = useAuth()

    const handleUserLogout = async() =>{
        try{
            const response = await handleLogout()
            if(response.success)
                logout()
        }catch(err){
            throw err
        }
    }
    return (
        <>
            <button type="button" onClick={handleUserLogout}>Logout</button>
            <TodoApp />
        </>
    )
}

export default Todo