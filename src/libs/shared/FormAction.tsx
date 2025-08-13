'use client'

import { ReactEventHandler } from 'react'
import { Button, Grid } from '../primitives'
import { colorPalette } from '../theme'

/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  onClose: ReactEventHandler
}

const FormAction = ({ onClose }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Grid
      padding={{ xs: '10px 16px', md: '10px 16px' }}
      columns={{ xs: 2, md: 1 }}
      container
      spacing={'8px'}
      style={{ backgroundColor: colorPalette.gray[2], marginBlockStart: 'auto' }}
      position={{ xs: 'fixed', md: 'sticky' }}
      right={0}
      left={0}
      bottom={0}
    >
      <Grid size={1} width={{ xs: '48%', md: '100px' }}>
        <Button variant='soft' size='medium' type='submit' style={{ width: '100%' }}>
          ثبت
        </Button>
      </Grid>
      <Grid size={1} width={{ xs: '50%', md: '100px' }}>
        <Button variant='solid' size='medium' style={{ width: '100%' }} onClick={onClose}>
          لغو
        </Button>
      </Grid>
    </Grid>
  )
}

export default FormAction

/**
 * styled-component
 * _______________________________________________________________________________
 */
