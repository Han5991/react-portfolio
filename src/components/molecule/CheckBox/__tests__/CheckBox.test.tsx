import React from 'react';

import CheckBox from '../index';

import {render, fireEvent} from '@lib/testing-library/react';

describe('CheckBox component test', () => {
  test('renders checkbox', () => {
    const {container} = render(<CheckBox />);
    const checkBoxElement = container.querySelector('input[type="checkbox"]');
    expect(checkBoxElement).toBeInTheDocument();
  });

  test('calls onChange handler when checked', () => {
    const onChange = jest.fn();
    const {container} = render(<CheckBox onChange={onChange} />);
    const checkBoxElement = container.querySelector(
      'input[type="checkbox"]',
    ) as Element;
    fireEvent.click(checkBoxElement);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('applies specified size', () => {
    const {container} = render(<CheckBox size="large" />);
    const checkBoxElement = container.querySelector(
      'input[type="checkbox"]',
    ) as Element;
    const theme = window.getComputedStyle(checkBoxElement);
    expect(theme.height).toBe('24px');
    expect(theme.width).toBe('24px');
  });

  test('disables checkbox when disabled prop is true', () => {
    const {container} = render(<CheckBox disabled />);
    const checkBoxElement = container.querySelector('input[type="checkbox"]');
    expect(checkBoxElement).toBeDisabled();
  });
});
