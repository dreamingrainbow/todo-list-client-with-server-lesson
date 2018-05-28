import axios from 'axios';
import {
    ADD_TODO,
    ADD_TODO_ERROR
} from '../constants';

export const addTodo = (newTodo) => {
    return axios
        .post('//localhost:3000/todo', {todo : newTodo})
        .then(response => {
            return {
                type : ADD_TODO,
                payload : response.data
            }
        })
        .catch(error => {
            return {
                type : ADD_TODO_ERROR,
                payload : error
            }
        })
}