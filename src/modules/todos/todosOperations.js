import * as actions from './todosActions';
import Api from '../../api';

export function addTodo(todo) {
  return async function addTodoThunk(dispatch, getState) {
    try {
      dispatch(actions.addTodo.start(todo));

      let newTodo = await Api.add(todo);

      dispatch(actions.addTodo.success({ todo: newTodo, id: todo.id }));
    } catch (error) {
      dispatch(actions.addTodo.error({ error, id: todo.id }));
    }
  };
}

export function removeTodo(id) {
  return async function removeTodoThunk(dispatch, getState) {
    let { todos } = getState().todos;
    try {
      dispatch(actions.removeTodo.start(id));

      await Api.remove(id);

      dispatch(actions.removeTodo.success());
    } catch (error) {
      let todo = todos.find(todo => todo.id === id);
      dispatch(actions.removeTodo.error({ error, todo }));
    }
  };
}

export function changeTypeTodo(id) {
  return async function changeTypeTodoThunk(dispatch, getState) {
    let { todos } = getState().todos;
    let todo = todos.find(todo => todo.id === id);
    try {
      await dispatch(actions.changeTypeTodo.start(id));

      todo.type = todo.type === 'new' ? 'completed' : 'new';

      let newTodo = await Api.update(id, todo);

      dispatch(actions.changeTypeTodo.success({ newTodo }));
    } catch (error) {
      dispatch(actions.changeTypeTodo.error({ error, id }));
    }
  };
}

export { actions };
