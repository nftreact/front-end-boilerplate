import { styled, Typography } from '@mui/material'
import React, { forwardRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Flex, IconButton } from '..'
import Add from '../../../../public/Add'
import { colorPalette } from '@/libs/theme'

type PrimitiveModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const PrimitiveModal = forwardRef<HTMLDivElement, PrimitiveModalProps>(({ open, onClose, children }, ref) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return ReactDOM.createPortal(
    <Backdrop onClick={onClose}>
      <ModalContent ref={ref} onClick={(e) => e.stopPropagation()}>
        <Flex
          position={'sticky'}
          top={0}
          style={{
            backgroundColor: colorPalette.gray[2],
            borderRadius: '8px',
          }}
          justifyContent={'space-between'}
          direction={'row'}
          padding={'10px 16px'}
        >
          <Typography style={{ color: colorPalette.gray[11] }}>عنوان</Typography>
          <IconButton variant='soft' size='small' onClick={onClose}>
            <AddStyle />
          </IconButton>
        </Flex>
        <Flex height={'calc(100% - 50px)'}>{children}</Flex>
      </ModalContent>
    </Backdrop>,
    document.body,
  )
})

PrimitiveModal.displayName = 'PrimitiveModal'

export default PrimitiveModal

const Backdrop = styled('div')`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled('div')`
  background: ${colorPalette.gray[1]};
  width: 100%;
  min-width: 300px;
  max-width: 60%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: fadeInScale 0.25s ease;
  height: 70dvh;
  overflow: scroll;
  border-radius: 8px;
  background-color: ${colorPalette.gray[1]};

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const AddStyle = styled(Add)`
  path {
    fill: red;
  }
`
