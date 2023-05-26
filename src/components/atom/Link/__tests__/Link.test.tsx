import React from 'react';

import Link from '../index';

import {render} from '@lib/testing-library/react';

describe('Link component test', () => {
  test('renders link with correct styling', () => {
    const props = {
      href: '/about',
      children: 'About',
      style: {fontWeight: 'bold'},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const {getByText} = render(<Link {...props} />);

    const linkElement = getByText('About');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveStyle('color: #282C34');
    expect(linkElement).toHaveStyle('font-weight: bold');
  });
});
