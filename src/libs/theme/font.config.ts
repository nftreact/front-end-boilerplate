import localFont from 'next/font/local'

export const sans = localFont({
  src: [
    {
      path: '../../../public/fonts/IRANSansX-Thin.woff2',
      weight: '400',
    },
    {
      path: '../../../public/fonts/IRANSansX-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../../public/fonts/IRANSansX-Medium.woff2',
      weight: '600',
    },
    {
      path: '../../../public/fonts/IRANSansX-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../../public/fonts/IRANSansX-ExtraBold.woff2',
      weight: '800',
    },
    {
      path: '../../../public/fonts/IRANSansX-Heavy.woff2',
      weight: '900',
    },
    {
      path: '../../../public/fonts/IRANSansXFaNum-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--sans-font',
})
