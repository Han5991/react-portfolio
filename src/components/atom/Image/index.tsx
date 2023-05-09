import NImage, {ImageProps} from 'next/image';

// eslint-disable-next-line react/jsx-props-no-spreading
const Image = (props: ImageProps) => <NImage data-testid="@image" {...props} />;

export default Image;
