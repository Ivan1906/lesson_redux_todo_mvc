import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import {compose, withHandlers} from 'recompose';
import { Provider } from 'react-redux';
import store from './store/createStore';

import { AddTodoEnhance } from './components/AddTodo';
import { NavBar } from './components/NavBar';
import { ListTodosEnhance } from './components/ListTodos';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="wrapper">
          <div className="container">
            <AddTodoEnhance />
            <NavBar />
            <Switch>
              <Route exact path="/" component={ListTodosEnhance} />
              <Route path="/new" component={ListTodosEnhance} />
              <Route path="/completed" component={ListTodosEnhance} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
/*
const enhance = compose(
  withHandlers({
    onKeyDown: props => event => {
    let {todos, counter, setTodos, setCounter} = props;
    todos.push({id: counter, text: event.currentTarget.value, type: "new"});
    setTodos(todos => todos);
    setCounter(n => n + 1);
  },
    onChange: props => event => {
      let { todos, setTodos } = props;
      let id = event.currentTarget.parentElement.getAttribute('id');

      let newTodos = todos.map(todo =>
        todo.id.toString() === id
          ? {
              ...todo,
              type: todo.type === 'new' ? 'completed' : 'new',
            }
          : todo,
      );
      setTodos(todos => newTodos);
    },
    onDelete: props => event => {
      let { todos, setTodos } = props;
      let id = event.currentTarget.parentElement.getAttribute('id');

      let newTodos = todos.filter(todo => (todo.id.toString() !== id ? todo : null));
      setTodos(todos => newTodos);
    },
  }),
);*/

export default App;
