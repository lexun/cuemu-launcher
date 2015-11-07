import React, { Component, PropTypes } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { scan } from '../actions/files';

@connect(store => { return { files: store.files } })

export default class Patcher extends Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
  }

  render() {
    return (
      <ProgressBar
        active
        bsStyle="warning"
        label="%(percent)s%"
        now={this.percentComplete()} />
    )
  }

  percentComplete() {
    let { files } = this.props
    return files.count(file => file.get('scanned')) / files.size * 100
  }
}
