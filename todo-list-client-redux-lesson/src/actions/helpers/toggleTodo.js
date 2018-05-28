import axios from 'axios';
import {
    TOGGLE_TODO,
    TOGGLE_TODO_ERROR
} from '../constants';

export const toggleTodo = (todoIndex) => {
    return axios
        .put(`//localhost:3000/todo/${todoIndex}`)
        .then(response => {
            return {
                type : TOGGLE_TODO,
                payload : response.data
            }
        })
        .catch(error => {
            return {
                type : TOGGLE_TODO_ERROR,
                payload : error
            }
        })
}
