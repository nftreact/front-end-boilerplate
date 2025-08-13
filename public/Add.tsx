import * as React from 'react';
import { SVGProps } from 'react';
const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 16 16' {...props}>
    <path fill='#fff' fillOpacity={0.01} d='M0 0h16v16H0z' />
    <path
      fill='#FCFCFD'
      fillRule='evenodd'
      d='M8.532 2.932a.533.533 0 0 0-1.067 0v4.533H2.932a.533.533 0 0 0 0 1.067h4.533v4.533a.533.533 0 0 0 1.067 0V8.532h4.533a.533.533 0 0 0 0-1.067H8.532z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgAdd;
