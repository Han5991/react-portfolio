import Li from '../index';

import {render, screen} from '@lib/testing-library/react';

describe('Li component', () => {
  test('renders children correctly', () => {
    const childrenText = 'Test Children';
    render(<Li>{childrenText}</Li>);
    const liElement = screen.getByText(childrenText);
    expect(liElement).toBeInTheDocument();
  });

  test('passes additional props correctly', () => {
    const className = 'custom-class';
    render(<Li className={className}>Test</Li>);
    const liElement = screen.getByText('Test');
    expect(liElement).toHaveClass(className);
  });
});
