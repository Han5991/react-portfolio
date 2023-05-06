import Box from '../index';

import {render, fireEvent} from '@lib/testing-library/react';

describe('Box component test', () => {
  test('renders with default props', () => {
    const text = 'Hello, World!';
    const {getByTestId} = render(<Box>{text}</Box>);
    expect(getByTestId('@box/container')).toHaveTextContent(text);
  });

  test('renders with custom props', () => {
    const onClick = jest.fn();
    const {getByTestId, container} = render(
      <Box size="small" type="square" borderColor="red" onClick={onClick} />,
    );
    fireEvent.click(getByTestId('@box/container'));
    expect(onClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
