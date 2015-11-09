import React, { Component } from 'react';
import Config from './config';
import Header from './header';
import Monitor from './monitor';
import Patcher from './patcher';
import { Grid, Row, Col } from 'react-bootstrap';

const styles = {
  patcher: {
    bottom: 20,
    position: 'fixed',
  }
}

export default class App extends Component {
  render() {
    return(
      <div>
        <Header />
        <Grid>
          <Row>
            <Col md={6}>
              <Config />
            </Col>
          </Row>

          <Row style={styles.patcher}>
            <Col md={6} style={styles.patcher}>
              <Patcher />
            </Col>
          </Row>
        </Grid>

        <Monitor />
      </div>
    )
  }
}
