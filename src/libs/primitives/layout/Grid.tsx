import { Grid, GridProps } from '@mui/material'
import React, { forwardRef } from 'react'

const CustomGrid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return <Grid {...props} ref={ref} />
})

CustomGrid.displayName = 'CustomGrid'

export default CustomGrid
