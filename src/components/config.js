import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import path from 'path';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadConfig, updateConfig } from '../actions/config';
import * as fields from '../constants/config-fields';

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
    base: {
      marginLeft: 10,
    },
    empty: {
      color: 'red',
    },
    valid: {
      color: 'green',
    },
  }
}

@radium
export class Config extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    loadConfig: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadConfig()
  }

  componentDidMount() {
    findDOMNode(this)
      .elements['install-location']
      .webkitdirectory = true
  }

  updateInstallLocation() {
    return event => {
      this.props.handleChange(
        fields.installLocation,
        event.target.files[0].path,
      )
    }
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
            style={[styles.path.base, styles.path[this.status()]]}>
            {this.labelText()}
          </label>
        </div>
      </form>
    )
  }

  labelText() {
    const messages = {
      empty: 'Please select your installation directory',
      valid: this.installLocationBasename(),
    }

    return messages[this.status()]
  }

  installLocationBasename() {
    return path.basename(
      this.props.config.get(fields.installLocation)
    )
  }

  status() {
    const path = this.props.config.get(fields.installLocation)
    return (typeof path === 'string' && path.length > 0) ? 'valid' : 'empty'
  }
}

function mapStateToProps(store) {
  return {
    config: store.config,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleChange: updateConfig,
    loadConfig,
  }, dispatch)
}

const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connectToStore(Config)
