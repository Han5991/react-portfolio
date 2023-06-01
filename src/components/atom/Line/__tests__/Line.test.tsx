import Line from '../index';

import {render} from '@lib/testing-library/react';

describe('Line component', () => {
  test('renders horizontal line with correct length', () => {
    const length = 100;
    const {container} = render(<Line type="horizontal" length={length} />);
    const lineElement = container.firstChild;

    expect(lineElement).toHaveStyle(`width: ${length}px`);
    expect(lineElement).toHaveStyle(`height: 1px`);
    expect(lineElement).toHaveStyle('background-color: rgb(109, 112, 117)');
  });

  test('renders vertical line with correct length', () => {
    const length = 200;
    const {container} = render(<Line type="vertical" length={length} />);
    const lineElement = container.firstChild;

    expect(lineElement).toHaveStyle(`width: 1px`);
    expect(lineElement).toHaveStyle(`height: ${length}px`);
    expect(lineElement).toHaveStyle('background-color: rgb(109, 112, 117)');
  });
});
