import * as actions from './todosActions';

export function addTodo(todo) {
  return async function addTodoThunk(dispatch, getState) {
    try {
      dispatch(actions.addTodo.start());

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      dispatch(actions.addTodo.success(todo));
    } catch (err) {
      dispatch(actions.addTodo.error());
    }
  };
}

export function removeTodo(id) {
  return async function removeTodoThunk(dispatch, getState) {
    try {
      dispatch(actions.removeTodo.start());

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      dispatch(actions.removeTodo.success(id));
    } catch (err) {
      dispatch(actions.removeTodo.error());
    }
  };
}

export function changeTypeTodo(id) {
  return async function changeTypeTodoThunk(dispatch, getState) {
    try {
      dispatch(actions.changeTypeTodo.start());

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      dispatch(actions.changeTypeTodo.success(id));
    } catch (err) {
      dispatch(actions.changeTypeTodo.error());
    }
  };
}

export { actions };
