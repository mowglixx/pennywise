'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  components: {
    MuiGrid2: {
      defaultProps: {
        // all grids under this theme will apply
        // negative margin on the top and left sides.
        disableEqualOverflow: true,
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#c73d0c'
    },
    secondary: {
      main: '#4e888a'
    },
    background: {
      default: '#312f3a',
      paper: '#312f3a'
    }
    },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;