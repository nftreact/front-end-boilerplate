'use client';

import React, { JSX, ReactNode } from 'react';

import styled, { css } from 'styled-components';

type Breakpoints = 'mobile' | 'tablet' | 'laptop' | 'desktop';

type ResponsiveProp<T> = {
  [key in Breakpoints]?: T;
};

type CustomGridProps = {
  children: ReactNode;
  columns?: ResponsiveProp<number | string>;
  rows?: ResponsiveProp<number | string>;
  gap?: ResponsiveProp<string | number>;
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
} & React.HTMLAttributes<HTMLDivElement> & { as?: keyof JSX.IntrinsicElements };

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

      let val: string;
      if (typeof value === 'number') {
        if (cssPropName === 'grid-template-columns' || cssPropName === 'grid-template-rows') {
          val = `repeat(${value}, 1fr)`;
        } else {
          val = `${value}px`;
        }
      } else {
        val = value.toString();
      }

      if (bp === 'mobile') return `${cssPropName}: ${val};`;
      return `@media (min-width: ${breakpointsPx[bp]}px) { ${cssPropName}: ${val}; }`;
    })
    .join('\n');
};

const CustomGridContainer = styled.div<CustomGridProps>`
  display: grid;
  box-sizing: border-box;
  ${({ columns }) => responsiveStyle(columns, 'grid-template-columns')}
  ${({ rows }) => responsiveStyle(rows, 'grid-template-rows')}
  ${({ gap }) => responsiveStyle(gap, 'gap')}
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
`;

export const Grid: React.FC<CustomGridProps> = ({ children, ...props }) => {
  return <CustomGridContainer {...props}>{children}</CustomGridContainer>;
};

// ---------------------------
// GridItem wrapper for children
// ---------------------------
type GridItemProps = {
  children: ReactNode;
  maxWidth?: ResponsiveProp<string | number>;
} & React.HTMLAttributes<HTMLDivElement>;

export const GridItem = styled.div<GridItemProps>`
  ${({ maxWidth }) => responsiveStyle(maxWidth, 'max-width')}
`;
