import React from 'react';

import Badge from '../index';

import {render, screen} from '@lib/testing-library/react';

describe('Badge component test', () => {
  test('renders badge with count correctly', () => {
    render(<Badge count={10} />);
    const count = screen.getByText('10');
    expect(count).toBeTruthy();
  });

  test('renders badge without count correctly', () => {
    render(<Badge />);
    const count = screen.queryByText('10');
    expect(count).toBeFalsy();
  });

  test('renders with default color and size', () => {
    render(<Badge />);

    const containerElement = screen.getByTestId('@badge/container');
    expect(containerElement).toHaveStyle(`
      background-color: rgb(250, 75, 106);
      min-width: 10px;
      min-height: 10px;
      border-radius: 10px;
    `);
  });

  test('renders with custom color and size', () => {
    const color = 'blue';
    const size = 30;
    render(<Badge color={color} size={size} />);

    const containerElement = screen.getByTestId('@badge/container');
    expect(containerElement).toHaveStyle(`
      background-color: ${color};
      min-width: ${size}px;
      min-height: ${size}px;
      border-radius: ${size}px;
    `);
  });
});
