import axios from 'axios';
import {
    REMOVE_TODO,
    REMOVE_TODO_ERROR
} from '../constants';

export const removeTodo = (todoIndex) => {
    return axios
        .delete(`//localhost:3000/todo/${todoIndex}`)
        .then(response => {
            return {
                type : REMOVE_TODO,
                payload : response.data
            }
        })
        .catch(error => {
            return {
                type : REMOVE_TODO_ERROR,
                payload : error
            }
        });
}
