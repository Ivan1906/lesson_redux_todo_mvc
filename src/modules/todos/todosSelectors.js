import { createSelector } from 'reselect';

const todos = state => state.todos.todos;
const isLoading = state => state.todos.isLoading;

export const getTodos = createSelector(
  todos,
  state => state,
);
export const getLoading = createSelector(
  isLoading,
  state => state,
);
export const getTodosByType = type => {
  return createSelector(
    todos,
    todos => todos.filter(todo => (!type || todo.type === type ? todo : null)),
  );
};
