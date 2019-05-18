import React from "react";
import {connect} from 'react-redux';
import {compose, withHandlers, defaultProps, setPropTypes} from "recompose";
import todosOperations from '../modules/todos/todosOperations';
import PropTypes from "prop-types";

function AddTodo({handleAddTodo}) {
  return (<input type="text" onKeyDown={handleAddTodo} placeholder="Add text Todo"/>);
}

const mapDispatchToProps = {
  addTodo: todosOperations.actions.AddTodo
};

const enhance = compose(
  connect(undefine, mapDispatchToProps),
  setPropTypes({onKeyDown: PropTypes.func.isRequired}), defaultProps({
  onKeyDown: () => console.log("Missing parameter onKeyDown!")
}), withHandlers({
  handleAddTodo: props => event => {
    if (event.keyCode === 13 && event.currentTarget.value.trim() !== "") {
      props.onKeyDown(event);
      event.currentTarget.value = "";
    }
  }
}));

export const AddTodoEnhance = enhance(AddTodo);