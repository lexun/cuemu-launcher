import React from 'react';

let Monitor

if (__DEVTOOLS__) {
  const { createDevTools } = require('redux-devtools');
  const LogMonitor = require('redux-devtools-log-monitor');
  const DockMonitor = require('redux-devtools-dock-monitor');

  Monitor = createDevTools(
    <DockMonitor defaultIsVisible={false}
                 changePositionKey='Q'
                 toggleVisibilityKey='H'>
      <LogMonitor />
    </DockMonitor>
  )
} else {
  Monitor = () => <div></div>
}

export default Monitor
