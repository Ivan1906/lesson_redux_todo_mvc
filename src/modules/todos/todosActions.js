import { createAsyncActions } from '@letapp/redux-actions';

export const addTodo = createAsyncActions('todos/ADD_TODO');
export const removeTodo = createAsyncActions('todos/REMOVE_TODO');
export const changeTypeTodo = createAsyncActions('todos/CHANGE_TYPE_TODO');
