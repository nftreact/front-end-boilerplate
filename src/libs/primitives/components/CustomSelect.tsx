'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

import styled, { css } from 'styled-components';

import { colorPalette } from '@/libs/theme';

import { Typography } from './Typography';

type OptionType = { value: string | number; label: string };

type PrimitiveSelectProps = {
  placeholder?: string;
  label?: string;
  options: OptionType[];
  errorText?: string;
} & React.HTMLAttributes<HTMLDivElement>; // Accept all native div attributes

const PrimitiveSelect = forwardRef<HTMLDivElement, PrimitiveSelectProps>(
  ({ label, options = [], errorText, placeholder, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | number>('');
    const [focusIndex, setFocusIndex] = useState<number>(-1);
    const listRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(prev => !prev);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isOpen && focusIndex >= 0) {
          selectOption(options[focusIndex].value);
        } else {
          toggleOpen();
        }
      }
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusIndex(0);
        } else {
          setFocusIndex(prev => (prev + 1) % options.length);
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusIndex(options.length - 1);
        } else {
          setFocusIndex(prev => (prev - 1 + options.length) % options.length);
        }
      }
    };

    const selectOption = (value: string | number) => {
      setSelected(value);
      setIsOpen(false);
    };

    // Scroll focused item into view
    useEffect(() => {
      if (listRef.current && focusIndex >= 0) {
        const item = listRef.current.children[focusIndex] as HTMLElement;
        item?.scrollIntoView({ block: 'nearest' });
      }
    }, [focusIndex]);

    return (
      <Container {...rest}>
        {label && <Label $isError={Boolean(errorText)}>{label}</Label>}

        <Trigger
          ref={ref}
          $isOpen={isOpen}
          $isError={Boolean(errorText)}
          role='button'
          tabIndex={0}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
        >
          {selected || (
            <span
              style={{
                color: Boolean(errorText) ? colorPalette.pink[9] : colorPalette.gray[9],
                fontSize: '12px',
              }}
            >
              {placeholder}
            </span>
          )}
          <Arrow $isOpen={isOpen}>
            <RiArrowDropDownLine style={{ scale: 1.7 }} />
          </Arrow>
        </Trigger>

        {isOpen && (
          <Dropdown role='listbox' ref={listRef}>
            {options.map((opt, index) => (
              <Option
                key={opt.value}
                role='option'
                aria-selected={selected === opt.value}
                $focused={focusIndex === index}
                onClick={() => selectOption(opt.value)}
                onMouseEnter={() => setFocusIndex(index)}
              >
                <Typography variant='body1'>{opt.label}</Typography>
              </Option>
            ))}
          </Dropdown>
        )}

        {errorText && <Error>{errorText}</Error>}
      </Container>
    );
  }
);

PrimitiveSelect.displayName = 'PrimitiveSelect';
export default PrimitiveSelect;

/**
 * styled-components
 * _______________________________________________________________________________
 */
const Container = styled('div')`
  position: relative;
  width: 100%;
`;

const Label = styled('label')<{ $isError: boolean }>`
  position: absolute;
  display: flex;
  top: -10px;
  right: 15px;
  padding-inline: 7px;
  font-size: 12px;
  background-color: ${colorPalette.gray[1]};
  color: ${({ $isError }) => ($isError ? colorPalette.pink[9] : colorPalette.gray[11])};
`;

const Trigger = styled('div')<{ $isOpen: boolean; $isError: boolean }>`
  border: 1px solid
    ${({ $isOpen, $isError }) =>
      $isError ? colorPalette.pink[9] : $isOpen ? colorPalette.blue[11] : colorPalette.gray[7]};
  padding: 16px;
  border-radius: 8px;
  background: ${({ $isError }) => ($isError ? colorPalette.pink[2] : colorPalette.gray[1])};
  color: ${({ $isError }) => ($isError ? colorPalette.pink[9] : colorPalette.gray[12])};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $isError }) => ($isError ? colorPalette.pink[9] : colorPalette.blue[11])};
    background: ${({ $isError }) => ($isError ? colorPalette.pink[2] : colorPalette.blue[1])};
  }

  &:focus {
    border-color: ${({ $isError }) => ($isError ? colorPalette.pink[9] : colorPalette.blue[2])};
    background: ${({ $isError }) => ($isError ? colorPalette.pink[2] : colorPalette.blue[2])};
    border: 1px solid
      ${({ $isOpen, $isError }) =>
        $isError ? colorPalette.pink[9] : $isOpen ? colorPalette.blue[11] : colorPalette.gray[7]};
  }
`;

const Arrow = styled('span')<{ $isOpen: boolean }>`
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  path {
    fill: ${colorPalette.gray[10]};
  }
`;

const Dropdown = styled('div')`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${colorPalette.gray[7]};
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
`;

const Option = styled('div')<{ $focused: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  ${({ $focused }) =>
    $focused &&
    css`
      background: ${colorPalette.blue[9]};
      p {
        color: ${colorPalette.gray[1]};
      }
    `}
  &:hover {
    background: ${colorPalette.blue[9]};
    p {
      color: ${colorPalette.gray[1]};
    }
  }
`;

const Error = styled(Typography)`
  display: block;
  color: ${colorPalette.pink[9]};
  font-size: 10px;
  padding-right: 13px;
`;
