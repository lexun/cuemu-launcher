import React, { Component } from 'react';
import Config from './config';
import Header from './header';
import Patcher from './patcher';
import Launcher from './launcher';
import { Grid, Row, Col } from 'react-bootstrap';

const styles = {
  footer: {
    bottom: 20,
    position: 'fixed',
    width: '100%',
    WebkitAppRegion: 'no-drag',
  },
  launcher: {
    marginTop: 15,
  },
}

export default class Main extends Component {
  render() {
    return(
      <div>
        <Header />

        <Grid>
          <Row>
            <Col xs={12}>
              <Config />
            </Col>
          </Row>

          <Row style={styles.footer}>
            <Col xs={10}>
              <Patcher />
            </Col>

            <Col xs={2} style={styles.launcher}>
              <Launcher />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
