import React, { Component, PropTypes } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { scan } from '../actions/files';

export class Patcher extends Component {
  static propTypes = {
    files: PropTypes.object.isRequired,
    start: PropTypes.func.isRequired,
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

function mapStateToProps(store) {
  return {
    files: store.files,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    start: scan,
  }, dispatch)
}

const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default connectToStore(Patcher)
