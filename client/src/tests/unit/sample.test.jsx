import React from 'react';

describe('Sample Test', () => {
  it('should run a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should render JSX without crashing', () => {
    const element = <div>Hello, test!</div>;
    expect(element.props.children).toBe('Hello, test!');
  });
});
