'use client'

import { styled } from '@mui/material'
import React, { useState } from 'react'
import { Flex } from '..'
import { colorPalette } from '@/libs/theme'

/**
 * props
 * _______________________________________________________________________________
 */
interface Option {
  label: string
  value: string
}

interface MultiCheckboxProps {
  isRow: boolean
  options: Option[]
  defaultValues?: string[]
  onChange?: (values: string[]) => void
}

/**
 * MultiCheckbox component
 * _______________________________________________________________________________
 */
const MultiCheckbox: React.FC<MultiCheckboxProps> = ({ options, defaultValues = [], onChange, isRow = true }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues)

  /**
   * handleChange
   * _______________________________________________________________________________
   */
  const handleChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    setSelectedValues(newValues)
    if (onChange) onChange(newValues)
  }

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <CheckboxList direction={isRow ? 'row' : 'column'} gap={'8px'}>
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value)
        return (
          <CheckboxWrapper key={option.value}>
            <HiddenCheckbox type='checkbox' checked={isChecked} onChange={() => handleChange(option.value)} />
            <StyledCheckbox checked={isChecked} />
            <CheckboxLabel>{option.label}</CheckboxLabel>
          </CheckboxWrapper>
        )
      })}
    </CheckboxList>
  )
}

export default MultiCheckbox

/**
 * styled-components
 * _______________________________________________________________________________
 */
const CheckboxList = styled(Flex)``

const CheckboxWrapper = styled('label')`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
`

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
`

interface StyledCheckboxProps {
  checked?: boolean
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
    borderWidth: '0 2px 2px 0',
    transform: checked ? 'rotate(45deg) scale(1)' : 'rotate(45deg) scale(0)',
    transition: 'transform 0.2s ease',
    position: 'absolute',
    bottom: '4px',
  },
}))

const CheckboxLabel = styled('span')`
  font-size: 14px;
  color: ${colorPalette.gray[11]};
`
