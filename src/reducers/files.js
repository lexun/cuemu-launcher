import { fromJS } from 'immutable';
import clientFiles from '../constants/client-files';
import * as actionTypes from '../constants/action-types';

const initialState = fromJS(clientFiles).map((file, index) => {
  return file.set('index', index)
})

export default function(state = initialState, action) {
  switch (action.type) {

    case actionTypes.FILE_SCANNED:
      return state
        .setIn([action.index, 'scanned'], true)
        .setIn([action.index, 'wasValid'], isValid(state, action))

    case actionTypes.FILE_SYNCED:
      return state.setIn([action.index, 'isSynced'], true)

    default:
      return state
  }
}

function isValid(state, action) {
  return action.md5 === state.getIn([action.index, 'md5'])
}
