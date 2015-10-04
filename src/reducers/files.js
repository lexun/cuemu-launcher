import { fromJS } from 'immutable';
import clientFiles from '../constants/client-files';
import * as actionTypes from '../constants/action-types';

const initialState = fromJS(clientFiles).map((file, index) => {
  return file.set('index', index + 1)
})

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FILE_SCANNED:
      return state.setIn([action.index, 'scanned'], true)
    default:
      return state
  }
}
