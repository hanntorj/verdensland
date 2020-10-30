import React from 'react';
import NavButtons from '../components/NavButtons';
const ReactTestRenderer = require('react-test-renderer');

describe('Button', () => {
  it('matches snapshot', () => {
    const tree = ReactTestRenderer.create(
      <NavButtons />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});