import Config from '../config'
import React from 'react';
import Utils from 'react-addons-test-utils';
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';

describe('<Config>', () => {
  jsdom()

  it('contains a file input with the webkitdirectory attribute', () => {
    const tree = Utils.renderIntoDocument(<Config />)
    const input = Utils.findRenderedDOMComponentWithTag(tree, 'input')

    expect(input.webkitdirectory).to.be.true
  })
})
