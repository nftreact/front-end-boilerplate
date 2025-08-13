'use client'

import { colorPalette } from '@/libs/theme'
import { css, styled } from '@mui/material'

type ButtonVariant = 'soft' | 'solid' | 'text'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant
  size: ButtonSize
}

export const Button = styled('button')<ButtonProps>`
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
  font-size: 12px !important;

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
        `
      case 'medium':
        return css`
          padding: 0.44rem 1rem;
          font-size: 14px;
        `
      case 'large':
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 16px;
        `
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
        `
      case 'soft':
        return css`
          background-color: ${colorPalette.blue[11]};
          color: white;
          border: none;

          &:hover:not(:disabled),
          &:focus-visible:not(:disabled) {
            background-color: ${colorPalette.blue[12]};
          }
        `
      case 'text':
        return css`
          background-color: transparent;
          color: ${colorPalette.blue[11]};
          border: none;

          &:hover:not(:disabled),
          &:focus-visible:not(:disabled) {
            background-color: rgba(0, 112, 243, 0.1);
          }
        `
    }
  }}
`
