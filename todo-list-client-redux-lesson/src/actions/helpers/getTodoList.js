import axios from 'axios';
import {
    GET_TODO_LIST,
    GET_TODO_LIST_ERROR
} from '../constants';

export const getTodoList = () => {
    return axios
        .get('http://localhost:3000/todo-list')
        .then(response => {        
            return {
                type : GET_TODO_LIST,
                payload : response.data.todoList
            }
        })
        .catch(error => {
            return {
                type : GET_TODO_LIST_ERROR,
                payload : error
            }
        });

}