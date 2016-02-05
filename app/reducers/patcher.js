import { Map, fromJS } from 'immutable';
import clientFiles from '../constants/client-files';
import * as actionTypes from '../constants/action-types';

const initialState = Map({
  status: 'pending',
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
      return state.setIn(['files', action.index, 'isSynced'], true)

    case actionTypes.PATCHING_COMPLETE:
      return state.set('status', 'complete')

    case actionTypes.PATCHING_STARTED:
      return state.set('status', 'patching')

    case actionTypes.SCANNING_STARTED:
      return state.set('status', 'scanning')

    default:
      return state
  }
}

function isValid(state, action) {
  const expected = state.getIn(['files', action.index, 'md5'])
  return action.md5 === expected || notRequired(expected) && present(action.md5)
}

function notRequired(md5) {
  return md5 === false
}

function present(md5) {
  return md5 !== null
}
