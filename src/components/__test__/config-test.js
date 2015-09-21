import Config from '../config'
import React from 'react';
import { renderIntoDocument,
         findRenderedDOMComponentWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';

describe('<Config>', () => {
  jsdom()

  it('contains a file input with the webkitdirectory attribute', () => {
    const tree = renderIntoDocument(<Config />)
    const input = findRenderedDOMComponentWithTag(tree, 'input')

    expect(input.webkitdirectory).to.be.true
  })
})
