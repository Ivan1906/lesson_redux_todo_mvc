import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import store from './store/createStore';
import {AppEnhance} from "./App";

ReactDOM.render(
  <Provider store={store}><AppEnhance/></Provider>, document.getElementById("root"));