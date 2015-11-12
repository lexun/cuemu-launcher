import { Map, fromJS } from 'immutable';
import clientFiles from '../constants/client-files';
import * as actionTypes from '../constants/action-types';

const initialState = Map({
  status: 'scanning',
  files: fromJS(clientFiles).map((file, index) => {
    return file.set('index', index)
  }),
})

export default function(state = initialState, action) {
  switch (action.type) {

    case actionTypes.FILE_SCANNED:
      return state
        .setIn(['files', action.index, 'scanned'], true)
        .setIn(['files', action.index, 'wasValid'], isValid(state, action))

    case actionTypes.FILE_SYNCED:
      return state.setIn([action.index, 'isSynced'], true)

    default:
      return state
  }
}

function isValid(state, action) {
  return action.md5 === state.getIn(['files', action.index, 'md5'])
}
