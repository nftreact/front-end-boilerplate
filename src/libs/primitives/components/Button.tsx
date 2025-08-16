'use client';

import styled, { css } from 'styled-components';

import { colorPalette } from '@/libs/theme';

type ButtonVariant = 'soft' | 'solid' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
type Breakpoints = 'mobile' | 'tablet' | 'laptop' | 'desktop';

type ResponsiveProp<T> = {
  [key in Breakpoints]?: T;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ResponsiveProp<string | number>;
  minWidth?: ResponsiveProp<string | number>;
  maxWidth?: ResponsiveProp<string | number>;
}

const breakpointsPx: Record<Breakpoints, number> = {
  mobile: 0,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
};

// Helper to generate responsive CSS
const responsiveStyle = <T extends string | number>(prop?: ResponsiveProp<T>, cssPropName?: string) => {
  if (!prop) return '';
  return Object.entries(prop)
    .map(([key, value]) => {
      const bp = key as Breakpoints;
      const val = typeof value === 'number' ? `${value}px` : value.toString();
      if (bp === 'mobile') return `${cssPropName}: ${val};`;
      return `@media (min-width: ${breakpointsPx[bp]}px) { ${cssPropName}: ${val}; }`;
    })
    .join('\n');
};

// Use shouldForwardProp to prevent invalid DOM attributes
export const Button = styled('button').withConfig({
  shouldForwardProp: prop => !['width', 'minWidth', 'maxWidth', 'size', 'variant'].includes(prop),
})<ButtonProps>`
  all: unset;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  max-height: max-content;
  box-sizing: border-box;
  font-family: var(--sans-font);
  width: auto;

  /* Responsive width */
  ${({ width }) => responsiveStyle(width, 'width')}
  ${({ minWidth }) => responsiveStyle(minWidth, 'min-width')}
  ${({ maxWidth }) => responsiveStyle(maxWidth, 'max-width')}

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #0000003e;
  }

  /* Size styles */
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 0.25rem 0.5rem;
          font-size: 12px;
        `;
      case 'medium':
        return css`
          padding: 0.6rem 1rem;
          font-size: 14px;
        `;
      case 'large':
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 16px;
        `;
    }
  }}

  /* Variant styles */
  ${({ variant = 'solid' }) => {
    switch (variant) {
      case 'solid':
        return css`
          background-color: ${colorPalette.gray[1]};
          color: ${colorPalette.blue[12]};
          border: 1px solid ${colorPalette.blue[12]};

          &:hover:not(:disabled),
          &:focus-visible:not(:disabled) {
            background-color: ${colorPalette.blue[3]};
          }
        `;
      case 'soft':
        return css`
          background-color: ${colorPalette.blue[11]};
          color: white;
          border: none;

          &:hover:not(:disabled),
          &:focus-visible:not(:disabled) {
            background-color: ${colorPalette.blue[12]};
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${colorPalette.blue[11]};
          border: none;

          &:hover:not(:disabled),
          &:focus-visible:not(:disabled) {
            background-color: rgba(0, 112, 243, 0.1);
          }
        `;
    }
  }}
`;
