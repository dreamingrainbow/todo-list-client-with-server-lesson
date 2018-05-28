import { SET_TODO } from '../actions';

export const todoReducer = ( todo = null, action) => {
    switch(action.type) {
        case SET_TODO:
            return action.payload.todo;
        default:
            return todo;
    }
};
