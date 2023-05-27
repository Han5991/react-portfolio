import React from 'react';

import LoadingSpinner from '../index';

import {render} from '@lib/testing-library/react';

describe('LoadingSpinner', () => {
  test('renders loading spinner', () => {
    const {getByTestId} = render(<LoadingSpinner />);
    const loadingSpinner = getByTestId('@loadingSpinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
});
