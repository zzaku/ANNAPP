import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';
import { useFavorites } from '@/contexts/FavoritesContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { favorites } = useFavorites();

    return (
        <>
            <Header favoriteCount={favorites.length} />
            <Container style={{ marginTop: '80px' }}>{children}</Container>
        </>
    );
};

export default Layout;