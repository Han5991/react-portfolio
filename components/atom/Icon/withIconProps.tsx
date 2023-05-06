import React, {FC, SVGProps} from 'react';

import {useTheme} from '@lib/styled-components';

export type IconProps = SVGProps<SVGSVGElement>;

const withIconProps =
  (Icon: FC<IconProps>) =>
  // eslint-disable-next-line react/display-name
  (iconProps: IconProps) => {
    const theme = useTheme();
    const defaultFill = theme.color.text[700];
    const defaultSize = theme.size[6];
    const {fill, width, height, ...restProps} = iconProps;
    return (
      <Icon
        data-testid="@icon"
        fill={fill ?? defaultFill}
        width={width ?? defaultSize}
        height={height ?? defaultSize}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
    );
  };

export default withIconProps;
