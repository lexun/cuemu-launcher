import { Map, fromJS } from 'immutable';
import * as actionTypes from '../constants/action-types';

const initialState = Map({
  installLocation: '',
})

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CONFIG_LOADED:
      return fromJS(action.options || state)
    case actionTypes.CONFIG_UPDATED:
      return state.set(action.field, action.value)
    default:
      return state
  }
}
