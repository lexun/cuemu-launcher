import * as actionTypes from '../constants/action-types'

export function configUpdated(field, value) {
  return {
    type: actionTypes.CONFIG_UPDATED,
    field,
    value,
  }
}

export function updateConfig(field, value) {
  return (dispatch, getState) => {
    dispatch(configUpdated(field, value))
    persistConfig(getState().config)
  }
}

function persistConfig(config) {
  return localStorage.setItem('config',
    JSON.stringify(config.toJS())
  )
}
