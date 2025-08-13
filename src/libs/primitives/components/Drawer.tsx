import React, { forwardRef } from 'react'
import SwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import { Flex, IconButton } from '..'
import { colorPalette } from '@/libs/theme'
import { styled, Typography } from '@mui/material'
import Add from '../../../../public/Add'

type PrimitiveSwipeableDrawerProps = SwipeableDrawerProps & {
  slideDirection?: 'left' | 'right' | 'up' | 'down'
}

const PrimitiveSwipeableDrawer = forwardRef<HTMLDivElement, PrimitiveSwipeableDrawerProps>(
  ({ children, onClose, anchor = 'left', slideDirection, sx, ...rest }, ref) => {
    const resolvedDirection =
      slideDirection ?? (anchor === 'left' ? 'right' : anchor === 'right' ? 'left' : anchor === 'top' ? 'down' : 'up')

    return (
      <SwipeableDrawer
        onClose={onClose}
        ref={ref}
        anchor={anchor}
        SlideProps={{
          direction: resolvedDirection,
        }}
        sx={{
          '.MuiDrawer-paper': {
            // borderTopLeftRadius: '10px',
            // borderTopRightRadius: '10px',
            backgroundColor: colorPalette.gray[2],
          },

          '& .MuiDrawer-paper': {
            transformOrigin:
              anchor === 'left'
                ? 'left center'
                : anchor === 'right'
                ? 'right center'
                : anchor === 'top'
                ? 'center top'
                : 'center bottom',
            transition: 'transform 0.3s ease',
          },
          ...sx,
        }}
        {...rest}
      >
        <Flex
          height={'100dvh'}
          style={{
            overflow: 'scroll',
            backgroundColor: colorPalette.gray[2],
          }}
        >
          <Flex
            p={'10px 16px'}
            style={{ backgroundColor: colorPalette.gray[3] }}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            position={'fixed'}
            top={0}
            right={0}
            left={0}
          >
            <Typography>عنوان</Typography>
            <IconButton variant='soft' size='small' onClick={onClose}>
              <AddStyle />
            </IconButton>
          </Flex>
          <Flex padding={'65px 16px 75px 16px'}>{children}</Flex>
        </Flex>
      </SwipeableDrawer>
    )
  },
)

PrimitiveSwipeableDrawer.displayName = 'PrimitiveSwipeableDrawer'

export default PrimitiveSwipeableDrawer

const AddStyle = styled(Add)`
  path {
    fill: red;
  }
`
