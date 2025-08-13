'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'var(--sans-font)',
    h1: {
      fontSize: '2.5rem', // 40px equivalent
      fontWeight: 600,
    },
    h2: {
      fontSize: '3rem', // 32px equivalent
      fontWeight: 500,
    },
    h3: {
      fontSize: '2rem', // 24px equivalent
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.8rem', // 20px equivalent
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem', // 18px equivalent
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem', // 14px equivalent
      fontWeight: 500,
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '0.75rem', // 12px equivalent
      fontWeight: 400,
      lineHeight: 2,
    },
    caption: {
      fontSize: '0.625rem', // 10px equivalent
      fontWeight: 400,
      lineHeight: 2,
    },
  },
  components: {},
})

export default theme
