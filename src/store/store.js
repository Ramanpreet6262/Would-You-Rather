import { createStore } from 'redux';
import reducer from '../reducers/index';
import middleware from '../middleware/index';

const store = createStore(reducer, middleware);

export default store;
