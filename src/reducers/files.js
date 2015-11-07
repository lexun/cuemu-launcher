import { fromJS } from 'immutable';
import clientFiles from '../constants/client-files';
import * as actionTypes from '../constants/action-types';

const initialState = fromJS(clientFiles).map((file, index) => {
  return file.set('index', index + 1)
})

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FILE_SCANNED:
      return state
        .setIn([action.index, 'scanned'], true)
        .setIn([action.index, 'isValid'], isValid(state, action))
    default:
      return state
  }
}

function isValid(state, action) {
  return action.md5 === state.getIn([action.index, 'md5'])
}
