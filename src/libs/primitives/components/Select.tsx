'use client'

import styled from '@emotion/styled'
import { forwardRef } from 'react'
import { InputLabel, MenuItem, Select, FormControl, SelectProps, MenuItemProps } from '@mui/material'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import { colorPalette } from '@/libs/theme'

export interface PrimitiveSelectProps extends Omit<SelectProps, 'children'> {
  label?: string
  options?: { label: string; value: string | number }[]
}

const PrimitiveSelect = forwardRef<HTMLDivElement, PrimitiveSelectProps>(
  ({ label = '', options = [], ...selectProps }, ref) => {
    const labelId = 'primitive-select-label'

    return (
      <Root fullWidth>
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <Select
          labelId={labelId}
          IconComponent={ArrowDropDownRoundedIcon}
          label={label}
          ref={ref}
          MenuProps={{
            MenuListProps: {
              sx: {
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
              },
            },
            PaperProps: {
              sx: {
                padding: '10px',
                marginTop: '5px',
                backgroundColor: colorPalette.gray[1],
                boxShadow: 'none',
                border: `0.8px solid ${colorPalette.gray[7]}`,
              },
            },
          }}
          {...selectProps} // pass all props directly to MUI Select
        >
          {options.map((opt) => (
            <StyledMenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </StyledMenuItem>
          ))}
        </Select>
      </Root>
    )
  },
)

PrimitiveSelect.displayName = 'PrimitiveSelect'
export default PrimitiveSelect

const Root = styled(FormControl)`
  box-shadow: none;

  /* Select root styling */
  && .MuiSelect-root {
    border-radius: 8px;
    font-size: 14px;
  }

  /* Error state */
  & .Mui-error {
    border-color: ${colorPalette.pink[12]};
    border-width: 1.2px;
  }

  /* Hover state for outline */
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${colorPalette.blue[11]} !important;
    background-color: ${colorPalette.blue[2]} !important;
    border-width: 0.8px;
  }

  /* Focused state for outline */
  && .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${colorPalette.blue[11]};
    background-color: ${colorPalette.blue[2]};
    border-width: 0.8px;
  }

  /* Input text z-index */
  && .MuiOutlinedInput-input {
    z-index: 1;
  }

  /* Label positioning and styling */
  & .MuiFormLabel-root {
    right: 25px;
    left: unset;
    font-size: 15px;
    label {
      padding-right: 100px !important;
    }

    &.Mui-focused {
      right: 28px;
      left: unset;
      font-size: 15px;
      color: ${colorPalette.blue[12]};
    }

    &.MuiFormLabel-filled {
      right: 28px;
      left: unset;
      font-size: 15px;
    }
  }

  & .MuiSelect-select {
    padding-right: 22px !important;
  }

  /* Select icon positioning */
  & .MuiSelect-icon {
    right: auto;
    left: 7px;
    z-index: 1;
  }
`

const StyledMenuItem = styled(MenuItem)<MenuItemProps>`
  font-size: 14px;
  color: ${colorPalette.gray[12]};
  border-radius: 8px;
  padding: 10px 16px;
  background-color: #fff;

  &.Mui-selected {
    background-color: ${colorPalette.blue[12]} !important;
    color: ${colorPalette.gray[1]} !important;
  }

  &:hover {
    background-color: ${colorPalette.blue[9]} !important;
    color: ${colorPalette.gray[1]} !important;
  }

  &.Mui-selected:hover {
    background-color: ${colorPalette.blue[9]} !important;
  }
`
