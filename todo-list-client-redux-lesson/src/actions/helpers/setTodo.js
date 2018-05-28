import {
    SET_TODO
} from '../constants';

export const setTodo = (newTodo) => {
    return {
        type : SET_TODO,
        payload : newTodo
    }
}
