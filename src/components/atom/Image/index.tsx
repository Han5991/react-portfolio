import NImage, {ImageProps} from 'next/image';

const Image = (props: ImageProps) => (
  <NImage
    data-testid="@image"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

export default Image;
