import React from 'react';
import { compose, withHandlers, defaultProps, setPropTypes, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { todosOperations } from '../modules/todos';

function ItemTodo({ todo, handlerChangeTypeTodo, handlerRemoveTodo }) {
  return (
    <div className="todo" id={todo.id}>
      <input
        type="checkbox"
        onClick={handlerChangeTypeTodo}
        checked={todo.type === 'completed' ? true : false}
      />
      <span>{todo.text}</span>
      <button onClick={handlerRemoveTodo}>Delete</button>
    </div>
  );
}

const mapDispatchToProps = {
  changeTypeTodo: todosOperations.changeTypeTodo,
  removeTodo: todosOperations.removeTodo,
};

const enhance = compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
  setPropTypes({
    todo: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['new', 'completed']).isRequired,
    }).isRequired,
    handlerChangeTypeTodo: PropTypes.func.isRequired,
    handlerRemoveTodo: PropTypes.func.isRequired,
  }),
  defaultProps({
    todo: {
      id: 'todoId',
      text: 'No todo element',
      type: 'new',
    },
    handlerChangeTypeTodo: () => console.log('Missing method handlerChangeTypeTodo!'),
    handlerRemoveTodo: () => console.log('Missing method handlerRemoveTodo!'),
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return this.props.todo.type !== nextProps.todo.type;
    },
  }),
  withHandlers({
    handlerChangeTypeTodo: props => event => {
      props.changeTypeTodo(event.currentTarget.parentElement.getAttribute('id'));
    },
    handlerRemoveTodo: props => event => {
      props.removeTodo(event.currentTarget.parentElement.getAttribute('id'));
    },
  }),
);

export const ItemTodoEnhance = enhance(ItemTodo);
