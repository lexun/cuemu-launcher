import React, { Component, PropTypes } from 'react'
import path from 'path'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateConfig } from '../actions/config'
import * as fields from '../constants/config-fields'

const styles = {
  input: {
    display: 'inline',
    width: 80,
  },
  label: {
    display: 'block',
    width: 150,
  },
  path: {
    color: 'green',
    marginLeft: 10
  }
}

export class Config extends Component {
  static propTypes = {
    config: React.PropTypes.object.isRequired,
    handleChange: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    findDOMNode(this)
      .elements['install-location']
      .webkitdirectory = true
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <label
            htmlFor='install-location'
            style={styles.label}>
            Installation Directory
          </label>

          <input
            id='install-location'
            onChange={this.updateInstallLocation()}
            style={styles.input}
            type='file' />

          <label
            htmlFor='install-location'
            style={styles.path}>
            {this.installLocationBasename()}
          </label>
        </div>
      </form>
    )
  }

  installLocationBasename() {
    return path.basename(
      this.props.config.get(fields.installLocation)
    )
  }

  updateInstallLocation() {
    return event => {
      this.props.handleChange(
        fields.installLocation,
        event.target.files[0].path,
      )
    }
  }
}

function mapStateToProps(store) {
  return {
    config: store.config,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleChange: updateConfig
  }, dispatch)
}

const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connectToStore(Config)
