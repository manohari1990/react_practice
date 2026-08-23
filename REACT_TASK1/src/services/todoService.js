import { fetchWithRetry } from './retryService';
import { HOST_URL } from '../utils/Constants';

const HEADERS = { 'Content-Type': 'application/json' } // Alerts server you are sending JSON

export const getAllTodos = async (params) => {
    const response = await fetchWithRetry(`${HOST_URL}/todos?${params}`, { method: 'GET', credentials: 'include', headers: HEADERS })
    return response;
}

export const saveTodo = async (formData) => {
    const response = await fetchWithRetry(`${HOST_URL}/todos`, { method: 'POST', credentials: 'include', headers: HEADERS, body: JSON.stringify(formData) })
    return response;
}

export const updateTodo = async (id, formData) => {
    const response = await fetchWithRetry(`${HOST_URL}/todos/${id}`, { method: 'PUT', credentials: 'include', headers: HEADERS, body: JSON.stringify(formData) })
    return response;
}

export const deleteTodoByID = async (id) => {
    const response = await fetchWithRetry(`${HOST_URL}/todos/${id}`, { method: 'DELETE', credentials: 'include', headers: HEADERS })
    return response;

}