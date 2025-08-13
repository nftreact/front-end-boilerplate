// components/Stack.tsx
'use client'

import React, { forwardRef } from 'react'

import Stack, { StackProps as MuiStackProps } from '@mui/material/Stack'

const CustomStack = forwardRef<HTMLDivElement, MuiStackProps>((props, ref) => {
  return <Stack {...props} ref={ref} />
})

CustomStack.displayName = 'CustomStack'

export default CustomStack
