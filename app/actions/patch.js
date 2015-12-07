import fs from 'fs';
import http from 'http';
import path from 'path';
import { patcherAddress } from '../constants/cuemu-addresses.js'
import * as actionTypes from '../constants/action-types';
import * as configFields from '../constants/config-fields';

export default function patch() {
  return dispatch => {
    dispatch({ type: actionTypes.PATCHING_STARTED })
    dispatch(patchNext())
  }
}

function patchNext() {
  return (dispatch, getState) => {
    let nextFile = getState().patcher.get('files').find(file => {
      return file.get('wasValid') === false && file.get('isSynced') !== true
    })

    if (nextFile) { return sync(nextFile, dispatch, getState()) }
    dispatch({ type: actionTypes.PATCHING_COMPLETE })
  }
}

function sync(file, dispatch, state) {
  const stream = fs.createWriteStream(path.resolve(
    state.config.get(configFields.installLocation),
    file.get('name')
  ))

  http.get(patcherAddress + file.get('name'), response => {
    response.pipe(stream)

    stream.on('finish', function() {
      stream.close()
      dispatch({ type: actionTypes.FILE_SYNCED, index: file.get('index') })
      dispatch(patchNext())
    })
  })
}
