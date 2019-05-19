import { handleActions } from '@letapp/redux-actions';
import * as actions from './todosActions';

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
};

export default handleActions(
  {
    [actions.addTodo.start]: state => ({
      ...state,
      isLoading: true,
    }),
    [actions.addTodo.success]: (state, action) => ({
      ...state,
      isLoading: false,
      todos: state.todos.concat(action.payload),
    }),
    [actions.addTodo.error]: state => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
    [actions.removeTodo.start]: state => ({
      ...state,
      isLoading: true,
    }),
    [actions.removeTodo.success]: (state, action) => ({
      ...state,
      isLoading: false,
      todos: state.todos.filter(todo => (todo.id !== action.payload ? todo : null)),
    }),
    [actions.removeTodo.error]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
    [actions.changeTypeTodo.start]: state => ({
      ...state,
      isLoading: true,
    }),
    [actions.changeTypeTodo.success]: (state, action) => ({
      ...state,
      isLoading: false,
      todos: state.todos.map(
        todo =>
          (todo =
            todo.id === action.payload
              ? {
                  ...todo,
                  type: todo.type === 'new' ? 'completed' : 'new',
                }
              : todo),
      ),
    }),
    [actions.changeTypeTodo.error]: state => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
  },
  initialState,
);
