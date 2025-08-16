import { ReactEventHandler } from 'react';

import { Button } from '../primitives';
import { Grid } from '../primitives/layout/Grid';
import { colorPalette } from '../theme';

/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  onClose: ReactEventHandler;
};

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
      columns={{ mobile: 2, tablet: 'max-content max-content' }}
      gap={{ mobile: '8px' }}
      style={{
        backgroundColor: colorPalette.gray[2],
        marginBlockStart: 'auto',
        padding: '10px 16px',
      }}
      position={{ mobile: 'fixed', laptop: 'sticky' }}
      right={{ mobile: 0 }}
      left={{ mobile: 0 }}
      bottom={{ mobile: 0 }}
      width={{ mobile: '100%' }}
    >
      {/* <GridItem maxWidth={{ mobile: '100%', tablet: 'max-content' }}> */}
      <Button variant='soft' size='medium' type='submit' minWidth={{ mobile: '100px' }}>
        ثبت
      </Button>
      {/* </GridItem> */}
      <Button variant='solid' size='medium' onClick={onClose} minWidth={{ mobile: '100px' }}>
        لغو
      </Button>
    </Grid>
  );
};

export default FormAction;

/**
 * styled-component
 * _______________________________________________________________________________
 */
