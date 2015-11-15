import fs from 'fs';
import http from 'http';
import path from 'path';
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
  const directory = state.config.get(configFields.installLocation)
  const filePath = path.resolve(directory, file.get('name'))
  const stream = fs.createWriteStream(filePath)
  const url = 'http://patcher1.cuemu.com/patch/' + file.get('name')

  http.get(url, response => {
    response.pipe(stream)

    stream.on('finish', function() {
      stream.close()
      dispatch({ type: actionTypes.FILE_SYNCED, index: file.get('index') })
      dispatch(patchNext())
    })
  })
}
