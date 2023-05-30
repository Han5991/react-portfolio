import NImage, {ImageProps} from 'next/image';

const Image = (props: ImageProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <NImage data-testid="@image" {...props} />
);

export default Image;
