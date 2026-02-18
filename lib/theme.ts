'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7CB342',
      dark: '#689F38',
      light: '#9CCC65',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: 'hsl(88, 30%, 95%)',
      contrastText: '#333333',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Poppins", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif' },
    h2: { fontFamily: '"Poppins", sans-serif' },
    h3: { fontFamily: '"Poppins", sans-serif' },
    h4: { fontFamily: '"Poppins", sans-serif' },
    h5: { fontFamily: '"Poppins", sans-serif' },
    h6: { fontFamily: '"Poppins", sans-serif' },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
