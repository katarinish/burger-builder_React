import { combineReducers } from 'redux';

import order from './order';
import burgerBuilder from './burgerBuilder';

export default combineReducers({
    order,
    burgerBuilder
});