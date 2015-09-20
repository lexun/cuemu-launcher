import React, { Component } from 'react';
import Config from './config';
import Header from './header';

export default class Layout extends Component {
  render() {
    return(
      <div>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Config />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
