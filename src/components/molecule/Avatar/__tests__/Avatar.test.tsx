import Avatar from '../index';

import {render, screen} from '@lib/testing-library/react';

describe('Avatar', () => {
  test('renders Avatar component with skeleton initially and then the image', () => {
    const imageUrl = 'https://example.com/avatar.jpg';
    render(<Avatar src={imageUrl} size="normal" />);

    const skeletonElement = screen.getByTestId('@Skeleton');
    expect(skeletonElement).toBeInTheDocument();

    const imageElement = screen.queryByAltText('userAvatar');
    expect(imageElement).toBeInTheDocument();

    // Image should not be rendered initially
    setTimeout(() => {
      // Skeleton should not be rendered after loading
      expect(screen.queryByTestId('@Skeleton')).toBeNull();

      // Image should be rendered after loading
      const loadedImageElement = screen.getByAltText('userAvatar');
      expect(loadedImageElement).toBeInTheDocument();
      expect(loadedImageElement).toHaveAttribute('src', imageUrl);
    }, 0);
  });
});
