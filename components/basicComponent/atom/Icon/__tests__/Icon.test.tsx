import React from 'react';

import Icon from '../index';

import {render, screen} from '@lib/testing-library/react';

describe('Icon component test', () => {
  test('should render default props snapshot', () => {
    const {container} = render(<Icon.HamburgerButton />);
    expect(container).toMatchSnapshot();
  });

  test('should render custom props snapshot', () => {
    const fill = 'red';
    const width = 100;
    const height = 200;
    render(<Icon.HamburgerButton fill={fill} width={width} height={height} />);
    const svgElement = screen.getByTestId('@icon');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('fill', fill);
    expect(svgElement).toHaveAttribute('width', `${width}`);
    expect(svgElement).toHaveAttribute('height', `${height}`);
  });
});
