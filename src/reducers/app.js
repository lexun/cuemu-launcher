import { combineReducers } from 'redux';
import config from './config';
import patcher from './patcher';

const appReducer = combineReducers({
  config,
  patcher,
})

export default appReducer
