import {useState} from 'react';

import {Box, Image, Skeleton} from '@components/atom';
import styled from '@lib/styled-components';

type AvatarProps = {
  size: 'small' | 'normal' | 'large' | number;
  src: string;
  onClick?: () => void;
};

const sizeMap = {
  small: 30,
  normal: 48,
  large: 60,
};

const AvatarImage = styled(Image)`
  border-radius: inherit;
`;

const Avatar = (props: AvatarProps) => {
  const {src, size, onClick} = props;
  const viewSize = typeof size === 'string' ? sizeMap[size] : size;
  const [isLoading, setIsLoading] = useState(true);

  const imageShow = () => setIsLoading(false);

  return (
    <Box type="square" size={viewSize} onClick={onClick}>
      <Skeleton show={isLoading} />
      <AvatarImage
        src={src}
        alt="userAvatar"
        width={viewSize}
        height={viewSize}
        onLoadingComplete={imageShow}
      />
    </Box>
  );
};

export default Avatar;
