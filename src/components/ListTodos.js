import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, defaultProps, setPropTypes } from 'recompose';

import { todosSelectors } from '../modules/todos';
import { ItemTodoEnhance } from './ItemTodo';

function ListTodos({ todos, isLoading }) {
  return (
    <React.Fragment>
      {todos.map(todo => {
        return <ItemTodoEnhance key={todo.id} todo={todo} />;
      })}
      {isLoading ? <div>Please wait "Processing data"!</div> : null}
    </React.Fragment>
  );
}

const mapStateToProps = (state, props) => ({
  todos: todosSelectors.getTodosByType(props.match.path.slice(1))(state),
  isLoading: todosSelectors.getLoading(state),
});

const enhance = compose(
  connect(
    mapStateToProps,
    undefined,
  ),
  setPropTypes({
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['new', 'completed']).isRequired,
      }),
    ).isRequired,
  }),
  defaultProps({ todos: [] }),
);

export const ListTodosEnhance = enhance(ListTodos);
