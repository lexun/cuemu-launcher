import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';
import { updateConfig } from '../actions/config';

@connect()

export default class Config extends Component {
  componentDidMount() {
    findDOMNode(this).elements['install-location'].webkitdirectory = true
  }

  render() {
    const { config, handleChange } = this.props

    return(
      <form>
        <Input
          id='install-location'
          label='Install Location'
          onChange={this.handleChange('install-location')}
          type='file' />
      </form>
    )
  }

  handleChange(field) {
    return (event) => {
      this.props.dispatch(
        updateConfig(field, event.target.files[0].path)
      )
    }
  }
}
