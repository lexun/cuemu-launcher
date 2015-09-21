import React, { Component } from 'react';
import ipc from 'ipc';

const styles = {
  main: {
    marginBottom: 60,
  },
  brand: {
    background: 'no-repeat url("logo.png")',
    backgroundSize: 215,
    minHeight: 100,
  },
  button: {
    margin: '20px 20px 0 0',
  }
}

export default class Header extends Component {
  render() {
    const btnAttrs = {
      className: 'label label-danger pull-right',
      onClick: () => { ipc.send('close') },
      style: styles.button,
    }

    return(
      <div style={styles.main}>
        <div style={styles.brand}>
          <button {...btnAttrs}>close</button>
        </div>
      </div>
    )
  }
}
