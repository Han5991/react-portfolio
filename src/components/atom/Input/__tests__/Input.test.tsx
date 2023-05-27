import Input from '../index';

import {render, screen} from '@lib/testing-library/react';

describe('Input component', () => {
  test('renders without errors', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('passes additional props correctly', () => {
    const placeholderText = 'Enter text';
    render(<Input placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });
});
