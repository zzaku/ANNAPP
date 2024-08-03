import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/router';

interface HeaderProps {
    favoriteCount: number;
}



const Header: React.FC<HeaderProps> = ({ favoriteCount }) => {
    const router = useRouter();

    const handleFavoritesClick = () => {
        router.push('/favorites');
    };

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button style={{ flexGrow: 1 }} color="inherit" onClick={handleHomeClick}>
                    <Typography variant="h5">Accueil</Typography>
                </Button>
                <Typography variant="h4">ANNA</Typography>
                <Button style={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center'
                }} color="inherit" onClick={handleFavoritesClick}>
                    <Typography sx={{ margin: '0 1em 0 0' }} variant="h5" gutterBottom>Favoris</Typography>
                    <FavoriteIcon sx={{ color: favoriteCount > 0 ? '#ff8080' : 'white' }} />
                    <Typography variant="body2" style={{ marginLeft: 5, color: 'white' }}>{favoriteCount}</Typography>
                </Button>
            </Toolbar>
        </AppBar>
    )
};

export default Header;
