'use client';

import {useServerInsertedHTML} from 'next/navigation';
import React from 'react';

import {useStyledComponentsRegistry} from './useStyledComponentsRegistry';

const RootStyleRegistry = ({children}: {children: React.ReactNode}) => {
  const [StyledComponentsRegistry, styledComponentsFlushEffect] =
    useStyledComponentsRegistry();

  useServerInsertedHTML(() => <>{styledComponentsFlushEffect()}</>);

  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};

export default RootStyleRegistry;
