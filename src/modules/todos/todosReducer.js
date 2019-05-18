import {handleActions} from 'redux-actions';
import * as actions from './todosActions';

const initialState = {
  todos: []
};

export default handleActions({
  [actions.addTodo]: (state, action) => ({
    todos: state
      .todos
      .concat(action.payload)
  }),
  [actions.removeTodo]: (state, action) => ({
    todos: state
      .todos
      .filter(todo => (todo.id !== action.payload
        ? todo
        : null))
  }),
  [actions.changeTypeTodo]: (state, action) => ({
    todos: state
      .todos
      .map(todo => todo = todo.id === action.payload
        ? {
          ...todo,
          type: todo.type === 'new'
            ? 'completed'
            : 'new'
        }
        : todo)
  })
}, initialState,);
