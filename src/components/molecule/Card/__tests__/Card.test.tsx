import React from 'react';

import Card from '../index';

import {render} from '@lib/testing-library/react';

describe('Card component', () => {
  test('renders the card with header, body, and footer', () => {
    const headerText = 'Header';
    const bodyText = 'Body';
    const footerText = 'Footer';

    const {getByText} = render(
      <Card
        size="small"
        header={<div>{headerText}</div>}
        body={<div>{bodyText}</div>}
        footer={<div>{footerText}</div>}
      />,
    );

    const header = getByText(headerText);
    const body = getByText(bodyText);
    const footer = getByText(footerText);

    expect(header).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  test('renders the card without header, body, and footer', () => {
    const {queryByTestId} = render(<Card size="small" />);

    const header = queryByTestId('header');
    const body = queryByTestId('body');
    const footer = queryByTestId('footer');

    expect(header).toBeNull();
    expect(body).toBeNull();
    expect(footer).toBeNull();
  });
});
