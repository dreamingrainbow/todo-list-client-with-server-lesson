import { GET_TODO_LIST, ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions';

export const todoListReducer = ( todoList = [], action) => {
    switch(action.type) {        
        case GET_TODO_LIST:
        case ADD_TODO:
        case TOGGLE_TODO:
        case REMOVE_TODO:
            return action.payload;
        default:
            return todoList;
    }
};
