import {handleActions} from 'redux-actions';
import * as actions from './todosActions';

const initialState = {
  todos: []
};

export default handleActions({
  [actions.addTodo]: (state, action) => ({
    todos: state.todos.concat(action.payload)
  }),
}, initialState);