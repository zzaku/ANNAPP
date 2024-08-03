// src/pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import Layout from '@/components/Layout';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <FavoritesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
  </FavoritesProvider>
  )
};

export default MyApp;
