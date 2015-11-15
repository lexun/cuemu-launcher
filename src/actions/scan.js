import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import patch from './patch';
import * as actionTypes from '../constants/action-types';
import * as configFields from '../constants/config-fields';

export default function scan(index = 0) {
  return (dispatch, getState) => {
    const state = getState()

    const redirect = interruptAction(dispatch, state, index)
    if (redirect) return redirect()

    const file = state.patcher.getIn(['files', index])
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

    fs.readFile(location, (error, result) => {
      if (error) return resolve(null)

      let md5 = crypto.createHash('md5'); md5.update(result)
      resolve(md5.digest('hex'))
    })
  })
}

function interruptAction(dispatch, state, index) {
  if (!isValidDirectory(state)) {
    return () => false
  } else if (isDoneScanning(state, index)) {
    return () => dispatch(patch())
  }
}

function isDoneScanning(state, index) {
  return index === state.patcher.get('files').size
}

function isValidDirectory(state) {
  const directory = state.config.get(configFields.installLocation)
  return typeof directory === 'string' && directory.length > 1
}
