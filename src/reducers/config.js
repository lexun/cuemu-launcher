import { Map, fromJS } from 'immutable';
import * as actionTypes from '../constants/action-types';

const initialState = fetchConfig() || Map({
  installLocation: '',
})

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CONFIG_UPDATED:
      return state.set(action.field, action.value)
    default:
      return state
  }
}

function fetchConfig() {
  return fromJS(
    JSON.parse(localStorage.getItem('config'))
  )
}
