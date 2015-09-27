import * as actionTypes from '../constants/action-types'

export function updateConfig(field, value) {
  return {
    type: actionTypes.CONFIG_UPDATED,
    field,
    value,
  }
}
