import React from 'react';

import Button from '../index';

import {render, fireEvent} from '@lib/testing-library/react';

describe('Button component test', () => {
  test('renders button with text', () => {
    const {getByText} = render(<Button>Hello</Button>);
    const buttonElement = getByText('Hello');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const onClick = jest.fn();
    const {getByText} = render(<Button onClick={onClick}>Click me</Button>);
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders loading spinner when loading prop is true', () => {
    const onClick = jest.fn();
    const {getByTestId, container} = render(
      <Button loading onClick={onClick}>
        Loading
      </Button>,
    );
    const loadingSpinner = getByTestId('@loadingSpinner');
    expect(loadingSpinner).toBeInTheDocument();
    fireEvent.click(container);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('applies specified color', () => {
    const {container} = render(<Button color="blue">Blue Button</Button>);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveStyle('background: rgb(28, 124, 208)');
    expect(buttonElement).toHaveStyle('color: rgb(255, 255, 255)');
  });
});
