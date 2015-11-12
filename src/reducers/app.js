import { combineReducers } from 'redux';
import config from './config';
import patcher from './files';

const appReducer = combineReducers({
  config,
  patcher,
})

export default appReducer
