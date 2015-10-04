import { combineReducers } from 'redux';
import config from './config';
import files from './files';

const appReducer = combineReducers({
  config,
  files,
})

export default appReducer
