'use client';

import React, { JSX, ReactNode } from 'react';

import styled, { css } from 'styled-components';

import { colorPalette } from '@/libs/theme';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body1' | 'body2' | 'caption';

type BreakpointKey = 'mobile' | 'tablet' | 'laptop' | 'desktop';

interface ResponsiveObject<T> {
  mobile?: T;
  tablet?: T;
  laptop?: T;
  desktop?: T;
}

type ResponsiveValue<T> = T | ResponsiveObject<T>;

interface TypographyProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  fontSize?: ResponsiveValue<string>;
  fontWeight?: ResponsiveValue<number | string>;
  lineHeight?: ResponsiveValue<number | string>;
}

const breakpoints: Record<BreakpointKey, string> = {
  mobile: '0px',
  tablet: '640px',
  laptop: '1024px',
  desktop: '1440px',
};

// Generic helper to apply responsive CSS
const responsiveCss = <T extends string | number>(prop: string, value?: ResponsiveValue<T>) => {
  if (value === undefined) return '';
  if (typeof value !== 'object') {
    return `${prop}: ${value};`;
  }
  return css`
    ${value.mobile && `${prop}: ${value.mobile};`}
    ${value.tablet && `@media (min-width: ${breakpoints.tablet}) { ${prop}: ${value.tablet}; }`}
    ${value.laptop && `@media (min-width: ${breakpoints.laptop}) { ${prop}: ${value.laptop}; }`}
    ${value.desktop && `@media (min-width: ${breakpoints.desktop}) { ${prop}: ${value.desktop}; }`}
  `;
};

// Base variant styles
const typographyConfig: Record<Variant, { fontSize: string; fontWeight: number; lineHeight?: number }> = {
  h1: { fontSize: '2.5rem', fontWeight: 600 },
  h2: { fontSize: '3rem', fontWeight: 500 },
  h3: { fontSize: '2rem', fontWeight: 500 },
  h4: { fontSize: '1.8rem', fontWeight: 500 },
  h5: { fontSize: '1.5rem', fontWeight: 400 },
  body1: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.8 },
  body2: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 2 },
  caption: { fontSize: '0.625rem', fontWeight: 400, lineHeight: 2 },
};

const StyledTypography = styled.p<{
  $variant: Variant;
  $fontSize?: ResponsiveValue<string>;
  $fontWeight?: ResponsiveValue<string | number>;
  $lineHeight?: ResponsiveValue<string | number>;
}>`
  font-family: var(--sans-font);
  margin: 0;
  color: ${colorPalette.gray[11]};

  ${({ $variant }) => {
    const cfg = typographyConfig[$variant];
    return css`
      font-size: ${cfg.fontSize};
      font-weight: ${cfg.fontWeight};
      ${cfg.lineHeight && `line-height: ${cfg.lineHeight};`}
    `;
  }}

  ${({ $fontSize }) => responsiveCss('font-size', $fontSize)}
  ${({ $fontWeight }) => responsiveCss('font-weight', $fontWeight)}
  ${({ $lineHeight }) => responsiveCss('line-height', $lineHeight)}
`;

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  children,
  fontSize,
  fontWeight,
  lineHeight,
  ...rest
}) => {
  return (
    <StyledTypography
      $variant={variant}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $lineHeight={lineHeight}
      {...rest}
    >
      {children}
    </StyledTypography>
  );
};
