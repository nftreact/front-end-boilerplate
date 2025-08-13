'use client'

import { colorPalette } from '@/libs/theme'
import { css, styled } from '@mui/material'
import React, { forwardRef, ReactNode } from 'react'

type ButtonVariant = 'soft' | 'solid' | 'text'
type ButtonSize = 'small' | 'medium' | 'large'

interface StyledIconButtonProps {
  size: ButtonSize
  variant: ButtonVariant
}

const sizeStyles = {
  small: css`
    width: 22px;
    height: 22px;
    padding: 4px;
  `,
  medium: css`
    width: 24px;
    height: 24px;
    padding: 8px;
  `,
  large: css`
    width: 30px;
    height: 30px;
    padding: 12px;
  `,
}

const Button = styled('button')<StyledIconButtonProps>`
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  ${({ size = 'medium' }) => sizeStyles[size]}
  ${({ variant = 'solid' }) => variantStyles[variant]}
`

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, 'aria-label': ariaLabel, size = 'medium', variant = 'solid', ...props }, ref) => {
    return (
      <Button ref={ref} aria-label={ariaLabel} size={size} variant={variant} {...props}>
        {children}
      </Button>
    )
  },
)

IconButton.displayName = 'IconButton'

export default IconButton

const variantStyles = {
  solid: css`
    background-color: ${colorPalette.gray[1]};
    color: ${colorPalette.gray[11]};
    border: 1px solid ${colorPalette.blue[12]};

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
      background-color: ${colorPalette.blue[3]};
    }
  `,
  soft: css`
    background-color: ${colorPalette.gray[4]};
    color: white;
    border: none;

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
      background-color: ${colorPalette.gray[4]};
      color: white;
    }
  `,
  text: css`
    background-color: transparent;
    color: ${colorPalette.blue[11]};
    border: none;

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
      background-color: ${colorPalette.blue[3]};
    }
  `,
}
