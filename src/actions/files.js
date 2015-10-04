import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import * as actionTypes from '../constants/action-types';

export function fileScanned(index, md5) {
  return {
    type: actionTypes.FILE_SCANNED,
    index,
    md5,
  }
}

export function scan(index = 0) {
  return (dispatch, getState) => {
    const state = getState()
    if (index == state.files.size) return false

    const file = state.files.get(index)
    const directory = state.config.get('installLocation')

    scanFile(file, directory).then(digest => {
      dispatch(fileScanned(index, digest))
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
