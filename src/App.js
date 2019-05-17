import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {compose, withHandlers, withState} from "recompose";
import {Provider} from 'react-redux';
import store from './store/createStore';

import {AddTodoEnhance} from "./components/AddTodo";
import {NavBar} from "./components/NavBar";
import {ListTodosEnhance} from "./components/ListTodos";
import "./App.css";

function App({onKeyDown, todos, onChange, onDelete}) {
  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper">
          <div className="container">
            <AddTodoEnhance onKeyDown={onKeyDown}/>
            <NavBar/>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (<ListTodosEnhance
                {...props}
                todos={todos}
                onChange={onChange}
                onDelete={onDelete}/>)}/>

              <Route
                path="/new"
                render={props => (<ListTodosEnhance
                {...props}
                todos={todos}
                onChange={onChange}
                onDelete={onDelete}/>)}/>

              <Route
                path="/completed"
                render={props => (<ListTodosEnhance
                {...props}
                todos={todos}
                onChange={onChange}
                onDelete={onDelete}/>)}/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

const enhance = compose(withState("todos", "setTodos", []), withState("counter", "setCounter", 1), withHandlers({
  onKeyDown: props => event => {
    let {todos, counter, setTodos, setCounter} = props;
    todos.push({id: counter, text: event.currentTarget.value, type: "new"});
    setTodos(todos => todos);
    setCounter(n => n + 1);
  },
  onChange: props => event => {
    let {todos, setTodos} = props;
    let id = event
      .currentTarget
      .parentElement
      .getAttribute("id");

    let newTodos = todos.map(todo => todo.id.toString() === id
      ? {
        ...todo,
        type: todo.type === "new"
          ? "completed"
          : "new"
      }
      : todo);
    setTodos(todos => newTodos);
  },
  onDelete: props => event => {
    let {todos, setTodos} = props;
    let id = event
      .currentTarget
      .parentElement
      .getAttribute("id");

    let newTodos = todos.filter(todo => todo.id.toString() !== id
      ? todo
      : null);
    setTodos(todos => newTodos);
  }
}));

export const AppEnhance = enhance(App);