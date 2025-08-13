import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import styled from '@emotion/styled';
import { css, Typography } from '@mui/material';

import { colorPalette } from '@/libs/theme';

type Variant = 'outlined' | 'filled' | 'underline';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
  error?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  errorText?: string;
}

const TextField = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'outlined', error = false, startAdornment, errorText, endAdornment, ...props }, ref) => {
    return (
      <>
        <Container variant={variant} error={error}>
          {startAdornment && <Adornment position='start'>{startAdornment}</Adornment>}
          <StyledInput
            ref={ref}
            variant={variant}
            {...props}
            style={{ color: error ? colorPalette.pink[9] : colorPalette.gray[11] }}
          />
          {endAdornment && <Adornment position='end'>{endAdornment}</Adornment>}
        </Container>
        {errorText && (
          <Typography fontSize={'10px'} pr={'10px'} mt={'-10px'} style={{ color: 'red' }}>
            {errorText}
          </Typography>
        )}
      </>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;

// Container to hold input and adornments
const Container = styled.div<{ variant: Variant; error: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;

  ${({ variant }) => variantStyles[variant]}

  ${({ error }) =>
    error &&
    css`
      border-color: ${colorPalette.pink[9]} !important;
      background-color: ${colorPalette.pink[2]};
      color: ${colorPalette.pink[9]} !important;

      input {
        border-color: ${colorPalette.pink[9]} !important;
        color: ${colorPalette.pink[9]}; /* text color when typing */

        &::placeholder {
          color: ${colorPalette.pink[9]}; /* placeholder color on error */
          opacity: 1; /* ensure it's visible */
        }
      }
    `}
`;

// Styled input, full width, no borders because container has it
const StyledInput = styled.input<{ variant: Variant }>`
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background: transparent;
  padding: 8px 12px;
  font-family: var(--sans-font);

  &:focus {
    outline: none;
  }
`;

const Adornment = styled.div<{ position: 'start' | 'end' }>`
  display: flex;
  align-items: center;
  color: #888;

  ${({ position }) =>
    position === 'start'
      ? css`
          margin-right: 8px;
        `
      : css`
          margin-left: 8px;
        `}
`;

const variantStyles = {
  outlined: css`
    border: 1px solid ${colorPalette.gray[8]};
    border-radius: 6px;
    background-color: white;
    padding: 6px 8px; // container padding to contain input + adornments

    &:focus-within {
      border-color: ${colorPalette.gray[12]};
    }

    &:hover {
      border-color: ${colorPalette.gray[12]};
    }
  `,
  filled: css`
    border-radius: 4px;
    background-color: #f0f0f0;
    padding: 0 8px;

    &:focus-within {
      background-color: #e0e0e0;
    }
  `,
  underline: css`
    border-bottom: 1px solid #ccc;
    padding: 0 8px;

    &:focus-within {
      border-bottom-color: #007bff;
    }
  `,
};
