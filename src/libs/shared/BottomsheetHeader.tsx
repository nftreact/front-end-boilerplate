'use client';

import styled from 'styled-components';

import Add from '@/public/Add';

import { Typography } from '../primitives';
import { colorPalette } from '../theme';

/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  title: string;
  onClose: () => void;
};

const BottomsheetHeader = ({ onClose, title }: Props) => {
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
    <Header>
      <Title>{title}</Title>
      <CloseButton onClick={onClose}>
        <AddStyle />
      </CloseButton>
    </Header>
  );
};

export default BottomsheetHeader;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Header = styled.div`
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  border-top-left-radius: 8px;
  z-index: 1;
  background-color: ${colorPalette.gray[2]};
`;

const Title = styled(Typography)`
  margin: 0;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

const AddStyle = styled(Add)`
  path {
    fill: red;
  }
`;
