import React, { Component, PropTypes } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = {
  complete: {
    color: 'limegreen'
  },
  patching: {
    color: 'orange'
  },
  scanning: {
    color: 'skyblue'
  },
}

@connect(store => {
  return {
    files: store.patcher.get('files'),
    status: store.patcher.get('status'),
  }
})

export default class Patcher extends Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
    status: PropTypes.oneOf(['complete', 'patching', 'pending', 'scanning']).isRequired,
  }

  render() {
    const { status } = this.props

    const statusStyleMap = {
      complete: 'success',
      patching: 'warning',
      scanning: 'info',
    }

    return (
      <div>
        <label style={styles[status]}>
          {this.statusText()}
        </label>

        <ProgressBar active={status !== 'complete'}
                     bsStyle={statusStyleMap[status]}
                     label="%(percent)s%"
                     now={this.percentComplete()} />
      </div>
    )
  }

  percentComplete() {
    switch (this.props.status) {
      case 'scanning':
        return this.scanningProgress()
      case 'patching':
        return this.patchingProgress()
      case 'complete':
        return 100
      default:
        return 0
    }
  }

  patchingProgress() {
    const files = this.props.files.filter(file => !file.get('wasValid'))
    return files.count(file => file.get('isSynced')) / files.size * 100
  }

  scanningProgress() {
    const { files } = this.props
    return files.count(file => file.get('scanned')) / files.size * 100
  }

  statusText() {
    const { status } = this.props
    if (status === 'complete') return this.capitalize(status)
    return <em>{this.capitalize(status) + '...'}</em>
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
