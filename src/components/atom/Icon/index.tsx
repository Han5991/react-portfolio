import {FC} from 'react';

import withIconProps, {IconProps} from './withIconProps';

import * as svgs from '@assets/svgs';

export type SvgName = keyof typeof svgs;
const svgNameList = Object.keys(svgs) as SvgName[];

const SvgMap = {} as {
  [k in SvgName]: FC<IconProps>;
};

svgNameList.forEach((svgName: SvgName) => {
  SvgMap[svgName] = withIconProps(svgs[svgName]);
});

export default SvgMap;
