import React from 'react';
import {compose, withHandlers, defaultProps, setPropTypes, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as todosOperations from '../modules/todos/todosOperations';

function ItemTodo({todo, handlerChangeTypeTodo, handlerRemoveTodo}) {
  return (
    <div className="todo" id={todo.id}>
      <input
        type="checkbox"
        onClick={handlerChangeTypeTodo}
        defaultChecked={todo.type === 'completed'
        ? true
        : false}/>

      <span>{todo.text}</span>
      <button onClick={handlerRemoveTodo}>Delete</button>
    </div>
  );
}

const mapStateToProps = state => ({todos: state.todos.todos});

const mapDispatchToProps = {
  changeTypeTodo: todosOperations.actions.changeTypeTodo,
  removeTodo: todosOperations.actions.removeTodo
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps,), setPropTypes({
  todo: PropTypes
    .shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes
      .oneOf(['new', 'completed'])
      .isRequired
  })
    .isRequired,
  handlerChangeTypeTodo: PropTypes.func.isRequired,
  handlerRemoveTodo: PropTypes.func.isRequired
}), defaultProps({
  todo: {
    id: 'todoId',
    text: 'No todo element',
    type: 'new'
  },
  handlerChangeTypeTodo: () => console.log('Missing method handlerChangeTypeTodo!'),
  handlerRemoveTodo: () => console.log('Missing method handlerRemoveTodo!')
}), lifecycle({
  shouldComponentUpdate(nextProps) {
    return this.props.todo.type !== nextProps.todo.type;
  }
}), withHandlers({
  handlerChangeTypeTodo: props => event => {
    props.changeTypeTodo(event.currentTarget.parentElement.getAttribute('id'));
  },
  handlerRemoveTodo: props => event => {
    props.removeTodo(event.currentTarget.parentElement.getAttribute('id'));
  }
}),);

export const ItemTodoEnhance = enhance(ItemTodo);
