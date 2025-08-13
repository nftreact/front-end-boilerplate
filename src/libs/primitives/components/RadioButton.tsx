'use client'

import { colorPalette } from '@/libs/theme'
import { styled } from '@mui/material'
import React, { forwardRef, useState, useEffect } from 'react'

/**
 * props
 * _______________________________________________________________________________
 */
interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  value: string
}

/**
 * RadioButton component
 * _______________________________________________________________________________
 */
const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, name, value, checked: checkedProp, ...props }, ref) => {
    const [checked, setChecked] = useState<boolean>(!!checkedProp)

    // update local state if controlled
    useEffect(() => {
      if (checkedProp !== undefined) {
        setChecked(checkedProp)
      }
    }, [checkedProp])

    return (
      <RadioWrapper>
        <HiddenRadio
          ref={ref}
          type='radio'
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          {...props}
        />
        <StyledRadio checked={checked} />
        <RadioLabel>{label}</RadioLabel>
      </RadioWrapper>
    )
  },
)

RadioButton.displayName = 'RadioButton'
export default RadioButton

/**
 * styled-components
 * _______________________________________________________________________________
 */
const RadioWrapper = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
})

const HiddenRadio = styled('input')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
})

const StyledRadio = styled('div')<{ checked?: boolean }>(({ checked }) => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  border: `2px solid ${checked ? colorPalette.blue[11] : colorPalette.gray[11]}`,
  backgroundColor: checked ? colorPalette.blue[11] : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  position: 'relative',
  '&::after': {
    content: '""',
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'white',
    opacity: checked ? 1 : 0,
    transition: 'opacity 0.2s ease',
  },
}))

const RadioLabel = styled('span')({
  fontSize: 14,
  color: colorPalette.gray[11],
})
