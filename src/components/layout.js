import React, { Component } from 'react';
import Config from './config';
import Header from './header';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Layout extends Component {
  render() {
    return(
      <div>
        <Header />
        <Grid>
          <Row>
            <Col md={12}>
              <Config />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
