import {createAction} from 'redux-actions';

export const addTodo = createAction('todos/ADD_TODO');
export const removeTodo = createAction('todos/REMOVE_TODO');
export const changeTypeTodo = createAction('todos/CHANGE_TYPE_TODO');
export const getTodosByType = createAction('todos/GET_TODOS_BY_TYPE');