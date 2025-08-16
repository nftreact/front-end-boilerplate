'use client';

import React, { JSX, ReactNode } from 'react';

import styled from 'styled-components';

type Breakpoints = 'mobile' | 'tablet' | 'laptop' | 'desktop';

type ResponsiveProp<T> = {
  [key in Breakpoints]?: T;
};

interface CustomFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: ResponsiveProp<'row' | 'column'>;
  gap?: ResponsiveProp<string | number>;
  align?: ResponsiveProp<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>;
  justify?: ResponsiveProp<
    'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  >;
  wrap?: ResponsiveProp<'nowrap' | 'wrap' | 'wrap-reverse'>;
  position?: ResponsiveProp<string>;
  padding?: ResponsiveProp<string | number>;
  margin?: ResponsiveProp<string | number>;
  top?: ResponsiveProp<string | number>;
  left?: ResponsiveProp<string | number>;
  right?: ResponsiveProp<string | number>;
  bottom?: ResponsiveProp<string | number>;
  display?: ResponsiveProp<string>;
  width?: ResponsiveProp<string | number>;
  minWidth?: ResponsiveProp<string | number>;
  maxWidth?: ResponsiveProp<string | number>;
  height?: ResponsiveProp<string | number>;
  minHeight?: ResponsiveProp<string | number>;
  maxHeight?: ResponsiveProp<string | number>;
  style?: React.CSSProperties;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const breakpointsPx: Record<Breakpoints, number> = {
  mobile: 0,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
};

const responsiveStyle = <T extends string | number>(prop?: ResponsiveProp<T>, cssPropName?: string) => {
  if (!prop) return '';

  return Object.entries(prop)
    .map(([key, value]) => {
      const bp = key as Breakpoints;
      const val =
        typeof value === 'number' &&
        !['grid-template-columns', 'grid-template-rows'].includes(cssPropName || '')
          ? `${value}px`
          : value.toString();

      if (bp === 'mobile') return `${cssPropName}: ${val};`;
      return `@media (min-width: ${breakpointsPx[bp]}px) { ${cssPropName}: ${val}; }`;
    })
    .join('\n');
};

const FlexContainer = styled.div<CustomFlexProps>`
  display: flex;
  ${({ direction }) => responsiveStyle(direction, 'flex-direction')}
  ${({ gap }) => responsiveStyle(gap, 'gap')}
  ${({ align }) => responsiveStyle(align, 'align-items')}
  ${({ justify }) => responsiveStyle(justify, 'justify-content')}
  ${({ wrap }) => responsiveStyle(wrap, 'flex-wrap')}
  ${({ position }) => responsiveStyle(position, 'position')}
  ${({ padding }) => responsiveStyle(padding, 'padding')}
  ${({ margin }) => responsiveStyle(margin, 'margin')}
  ${({ top }) => responsiveStyle(top, 'top')}
  ${({ left }) => responsiveStyle(left, 'left')}
  ${({ right }) => responsiveStyle(right, 'right')}
  ${({ bottom }) => responsiveStyle(bottom, 'bottom')}
  ${({ display }) => responsiveStyle(display, 'display')}
  ${({ width }) => responsiveStyle(width, 'width')}
  ${({ minWidth }) => responsiveStyle(minWidth, 'min-width')}
  ${({ maxWidth }) => responsiveStyle(maxWidth, 'max-width')}
  ${({ height }) => responsiveStyle(height, 'height')}
  ${({ minHeight }) => responsiveStyle(minHeight, 'min-height')}
  ${({ maxHeight }) => responsiveStyle(maxHeight, 'max-height')}
`;

export const Flex: React.FC<CustomFlexProps> = ({ children, ...props }) => {
  return <FlexContainer {...props}>{children}</FlexContainer>;
};
