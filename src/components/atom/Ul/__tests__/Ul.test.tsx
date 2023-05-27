import Ul from '../index';

import {render, screen} from '@lib/testing-library/react';

describe('Ul component', () => {
  test('renders children correctly', () => {
    const childrenText = 'Test Children';
    render(<Ul>{childrenText}</Ul>);
    const ulElement = screen.getByText(childrenText);
    expect(ulElement).toBeInTheDocument();
  });

  test('passes additional props correctly', () => {
    const className = 'custom-class';
    render(<Ul className={className}>Test</Ul>);
    const ulElement = screen.getByText('Test');
    expect(ulElement).toHaveClass(className);
  });
});
