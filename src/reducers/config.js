import { Map } from 'immutable';
import * as actionTypes from '../constants/action-types';

const initialState = Map()

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CONFIG_UPDATED:
      return state.set(action.field, action.value)
    default:
      return state
  }
}
