import { handleActions } from '@letapp/redux-actions';
import * as actions from './todosActions';

const initialState = {
  todos: [],
  isLoading: false,
  message: null,
  isError: false,
};

export default handleActions(
  {
    [actions.addTodo.start]: (state, action) => ({
      ...state,
      isLoading: true,
      isError: false,
      message: null,
      todos: state.todos.concat(action.payload),
    }),
    [actions.addTodo.success]: (state, action) => ({
      ...state,
      isLoading: false,
      todos: state.todos.map(todo => (todo.id === action.payload.id ? action.payload.todo : todo)),
    }),
    [actions.addTodo.error]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      message: action.payload.error.message,
      todos: state.todos.map(todo => (todo.id !== action.payload.id ? todo : null)),
    }),
    [actions.removeTodo.start]: (state, action) => ({
      ...state,
      isLoading: true,
      isError: false,
      message: null,
      todos: state.todos.filter(todo => (todo.id !== action.payload ? todo : null)),
    }),
    [actions.removeTodo.success]: state => ({
      ...state,
      isLoading: false,
    }),
    [actions.removeTodo.error]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      message: action.payload.error.message,
      todos: state.todos.concat(action.payload.todo),
    }),
    [actions.changeTypeTodo.start]: (state, action) => ({
      ...state,
      isLoading: true,
      isError: false,
      message: null,
      todos: state.todos.map(todo =>
        todo.id === action.payload
          ? {
              ...todo,
              type: todo.type === 'new' ? 'completed' : 'new',
            }
          : todo,
      ),
    }),
    [actions.changeTypeTodo.success]: (state, action) => ({
      ...state,
      isLoading: false,
      todos: state.todos.map(todo =>
        todo.id === action.payload.newTodo.id ? action.payload.newTodo : todo,
      ),
    }),
    [actions.changeTypeTodo.error]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      message: action.payload.error.message,
      todos: state.todos.map(todo =>
        todo.id === action.payload.id
          ? {
              ...todo,
              type: todo.type === 'new' ? 'completed' : 'new',
            }
          : todo,
      ),
    }),
  },
  initialState,
);
