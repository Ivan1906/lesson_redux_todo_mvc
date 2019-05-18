import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {compose, defaultProps, setPropTypes, mapProps} from 'recompose';

import {todosSelectors} from '../modules/todos';
import {ItemTodoEnhance} from './ItemTodo';

function ListTodos({todos}) {
  return (
    <React.Fragment>
      {todos.map(todo => {
        return <ItemTodoEnhance key={todo.id} todo={todo}/>;
      })}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  todos: todosSelectors.getTodos(state)
});

const mapDispatchToProps = {};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps,), setPropTypes({
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes
      .oneOf(['new', 'completed'])
      .isRequired
  }),).isRequired
}), defaultProps({todos: []}), mapProps(props => {
  let {todos, match} = props;
  if (match.path !== '/') {
    todos = todos.filter(todo => (todo.type === match.path.slice(1)
      ? todo
      : null));

    return {
      ...props,
      todos
    };
  }

  return props;
}),);

export const ListTodosEnhance = enhance(ListTodos);
