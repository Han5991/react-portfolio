import {FC, SVGProps} from 'react';

import withIconProps from './withIconProps';

import * as svgs from '@assets/svgs';

export type SvgName = keyof typeof svgs;
const svgNameList = Object.keys(svgs) as SvgName[];

const SvgMap = {} as {
  [k in SvgName]: FC<SVGProps<SVGSVGElement>>;
};

svgNameList.forEach((svgName: SvgName) => {
  SvgMap[svgName] = withIconProps(svgs[svgName]);
});

export default SvgMap;
