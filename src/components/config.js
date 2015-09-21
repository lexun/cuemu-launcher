import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class Config extends Component {
  componentDidMount() {
    findDOMNode(this).elements['install-location'].webkitdirectory = true
  }

  render() {
    return(
      <form>
        <div className='form-group'>
          <label htmlFor='install-location'>Install Location</label>
          <input id='install-location' type='file' />
        </div>
      </form>
    )
  }
}
