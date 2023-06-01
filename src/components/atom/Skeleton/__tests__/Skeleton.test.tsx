import Skeleton from '../index';

import {render, screen} from '@lib/testing-library/react';

test('renders Skeleton component when show prop is true', () => {
  const {container} = render(<Skeleton show />);
  expect(container).toBeInTheDocument();
});

test('does not render Skeleton component when show prop is false', () => {
  render(<Skeleton show={false} />);
  expect(screen.queryByTestId('@Skeleton')).toBeNull();
});
