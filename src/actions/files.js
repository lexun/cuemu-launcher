import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import * as actionTypes from '../constants/action-types';
import * as configFields from '../constants/config-fields';

export function scan(index = 0) {
  return (dispatch, getState) => {
    const state = getState()

    if (isDoneScanning(state, index) || !isValidDirectory(state)) return false

    const file = state.files.get(index)
    const directory = state.config.get(configFields.installLocation)

    scanFile(file, directory).then(digest => {
      dispatch({ type: actionTypes.FILE_SCANNED, index, md5: digest })
      dispatch(scan(index + 1))
    })
  }
}

function scanFile(file, directory) {
  return new Promise(resolve => {
    const location = path.resolve(directory, file.get('name'))

    fs.readFile(location, (_error, result) => {
      let md5 = crypto.createHash('md5'); md5.update(result)
      resolve(md5.digest('hex'))
    })
  })
}

function isDoneScanning(state, index) {
  return index === state.files.size
}

function isValidDirectory(state, index) {
  const directory = state.config.get(configFields.installLocation)
  return typeof directory === 'string' && directory.length > 1
}
