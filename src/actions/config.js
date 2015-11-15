import scan from './scan';
import * as actionTypes from '../constants/action-types';

export function loadConfig() {
  return dispatch => {
    dispatch({
      type: actionTypes.CONFIG_LOADED,
      options: JSON.parse(localStorage.getItem('config'))
    })

    dispatch(scan())
  }
}

export function updateConfig(field, value) {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.CONFIG_UPDATED, field, value })
    persistConfig(getState().config.toJS())

    dispatch(scan())
  }
}

function persistConfig(config) {
  return localStorage.setItem('config', JSON.stringify(config))
}
