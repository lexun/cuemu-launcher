import React, { Component, PropTypes} from 'react';
import DevTools from './dev-tools';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}

        <div className='dev-tools'>
          <DevTools />
        </div>
      </div>
    );
  }
}
