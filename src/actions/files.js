import crypto from 'crypto';
import fs from 'fs';
import http from 'http';
import path from 'path';
import * as actionTypes from '../constants/action-types';
import * as configFields from '../constants/config-fields';

export function scan(index = 0) {
  return (dispatch, getState) => {
    const state = getState()

    const redirect = interruptAction(dispatch, state, index)
    if (redirect) return redirect()

    const file = state.files.get(index)
    const directory = state.config.get(configFields.installLocation)

    scanFile(file, directory).then(digest => {
      dispatch({ type: actionTypes.FILE_SCANNED, index, md5: digest })
      dispatch(scan(index + 1))
    })
  }
}

function patch() {
  return (dispatch, getState) => {
    let nextFile = getState().files.find(file => {
      return file.get('wasValid') === false && file.get('isSynced') !== true
    })

    if (nextFile) { sync(nextFile, dispatch, getState()) }
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
      dispatch(patch())
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
  return index === state.files.size
}

function isValidDirectory(state) {
  const directory = state.config.get(configFields.installLocation)
  return typeof directory === 'string' && directory.length > 1
}
