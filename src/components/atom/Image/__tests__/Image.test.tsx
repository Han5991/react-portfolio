import React from 'react';

import Image from '../index';

import {render} from '@lib/testing-library/react';

describe('image component test', () => {
  test('style render correctly', () => {
    const height = 200;
    const width = 200;
    const uri = 'https://test.com';
    const {container} = render(
      <Image src={uri} height={height} width={width} alt="test" />,
    );
    expect(container).toMatchSnapshot();
  });
});
