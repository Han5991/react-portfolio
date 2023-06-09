import React from 'react';

import Heatmap from '../index';

import {render} from '@lib/testing-library/react';

describe('Heatmap', () => {
  test('renders the Heatmap component', () => {
    render(<Heatmap count={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} />);
  });
});
