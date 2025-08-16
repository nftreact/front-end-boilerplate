'use client';

import React, { forwardRef, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styled, { css, keyframes } from 'styled-components';

import { Grid } from '../layout/Grid';

type PrimitiveDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  slideDirection?: 'left' | 'right' | 'up' | 'down';
  isFullHeight?: boolean;
  children: ReactNode;
};

const PrimitiveDrawer = forwardRef<HTMLDivElement, PrimitiveDrawerProps>(
  ({ isOpen, onClose, slideDirection = 'right', isFullHeight = false, children }, ref) => {
    useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
      <Overlay onClick={onClose} display={{ mobile: 'grid', laptop: 'none' }}>
        <DrawerContainer
          ref={ref}
          direction={slideDirection}
          isFullHeight={isFullHeight}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </DrawerContainer>
      </Overlay>,
      document.body
    );
  }
);

PrimitiveDrawer.displayName = 'PrimitiveDrawer';
export default PrimitiveDrawer;

// ----- Styled Components -----

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = {
  left: keyframes`from { transform: translateX(-100%); } to { transform: translateX(0); }`,
  right: keyframes`from { transform: translateX(100%); } to { transform: translateX(0); }`,
  up: keyframes`from { transform: translateY(-100%); } to { transform: translateY(0); }`,
  down: keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`,
};

const Overlay = styled(Grid)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const DrawerContainer = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isFullHeight' && prop !== 'direction',
})<{
  direction: 'left' | 'right' | 'up' | 'down';
  isFullHeight?: boolean;
}>`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  animation: ${p => css`
    ${slideIn[p.direction]} 0.3s ease forwards
  `};

  ${p => p.direction === 'left' && 'left: 0; top: 0; height: 100dvh;'}
  ${p => p.direction === 'right' && 'right: 0; top: 0; height: 100dvh;'}
  ${p => p.direction === 'up' && 'top: 0; left: 0; width: 100vw;'}
  ${p =>
    p.direction === 'down' &&
    `bottom: 0; left: 0; width: 100vw; height: ${p.isFullHeight ? '100dvh' : 'auto'};`}
`;
