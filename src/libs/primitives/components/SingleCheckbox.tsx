'use client';

import React, { forwardRef, useState } from 'react';

import styled from 'styled-components';

import { colorPalette } from '@/libs/theme';

interface SingleCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SingleCheckbox = forwardRef<HTMLInputElement, SingleCheckboxProps>(
  ({ label, checked: controlledChecked, onChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(controlledChecked ?? false);

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      if (onChange) onChange(e);
    };

    return (
      <CheckboxWrapper>
        <HiddenCheckbox ref={ref} type='checkbox' checked={checked} onChange={handleChange} {...props} />
        <StyledCheckbox checked={checked} />
        <CheckboxLabel>{label}</CheckboxLabel>
      </CheckboxWrapper>
    );
  }
);

SingleCheckbox.displayName = 'SingleCheckbox';
export default SingleCheckbox;

/**
 * styled-components
 */
const CheckboxWrapper = styled('label')`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const HiddenCheckbox = styled('input')`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

interface StyledCheckboxProps {
  checked?: boolean;
}

const StyledCheckbox = styled('div')<StyledCheckboxProps>(({ checked }) => ({
  width: '18px',
  height: '18px',
  borderRadius: '4px',
  border: `1px solid ${colorPalette.gray[11]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  backgroundColor: checked ? colorPalette.blue[11] : 'transparent',
  position: 'relative',

  '&::after': {
    content: '""',
    width: '6px',
    height: '12px',
    border: 'solid white',
    borderWidth: '0 2.2px 2.2px 0',
    transform: checked ? 'rotate(45deg) scale(1)' : 'rotate(45deg) scale(0)',
    transition: 'transform 0.2s ease',
    position: 'absolute',
    bottom: '4px',
  },
}));

const CheckboxLabel = styled('span')`
  font-size: 14px;
  color: ${colorPalette.gray[11]};
`;
