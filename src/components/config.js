import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Input } from 'react-bootstrap';

export default class Config extends Component {
  componentDidMount() {
    findDOMNode(this).elements['install-location'].webkitdirectory = true
  }

  render() {
    return(
      <form>
        <Input label='Install Location' type='file' id='install-location' />
      </form>
    )
  }
}
