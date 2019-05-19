import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, defaultProps, setPropTypes } from 'recompose';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import { todosOperations } from '../modules/todos';

function AddTodo({ handleAddTodo }) {
  return <input type="text" onKeyDown={handleAddTodo} placeholder="Add text Todo" />;
}

const mapDispatchToProps = {
  addTodo: todosOperations.addTodo,
};

const enhance = compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
  setPropTypes({ handleAddTodo: PropTypes.func.isRequired }),
  defaultProps({
    handleAddTodo: () => console.log('Missing method handleAddTodo!'),
  }),
  withHandlers({
    handleAddTodo: props => event => {
      if (event.keyCode === 13 && event.currentTarget.value.trim() !== '') {
        let todo = {
          id: uuid(),
          text: event.currentTarget.value.trim(),
          type: 'new',
        };
        props.addTodo(todo);
        event.currentTarget.value = '';
      }
    },
  }),
);

export const AddTodoEnhance = enhance(AddTodo);
