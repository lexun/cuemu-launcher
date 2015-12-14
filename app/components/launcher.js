import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { installLocation } from '../constants/config-fields';
import { executable } from '../constants/client-files';
import { connect } from 'react-redux';
import { spawn } from 'child_process';

@connect(store => {
  return {
    installLocation: store.config.get(installLocation),
    status: store.patcher.get('status'),
  }
})

export default class Launcher extends Component {
  render() {
    return (
      <Button {...this.attributes()}>
        Launch
      </Button>
    )
  }

  attributes() {
    const isReady = this.isReady()
    return {
      bsStyle: isReady ? 'default' : 'primary',
      disabled: !isReady,
      onClick: this.launch(),
    }
  }

  isReady() {
    const { status } = this.props
    return status === 'complete'
  }

  launch() {
    const { installLocation } = this.props
    return () => spawn(executable, { cwd: installLocation })
  }
}
