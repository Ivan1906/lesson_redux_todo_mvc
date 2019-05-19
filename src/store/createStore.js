import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../modules';

const store = compose(applyMiddleware(thunk, logger))(createStore)(rootReducer);

export default store;
