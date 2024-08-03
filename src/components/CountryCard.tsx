// src/components/CountryCard.tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import { useFavorites } from '../contexts/FavoritesContext';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface CountryCardProps {
    code: string;
    name: string;
    region: string;
    flag: string;
}

const CountryCard: React.FC<CountryCardProps> = ({ code, name, region, flag }) => {
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const isFavorite = favorites.includes(code);

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isFavorite) {
            removeFromFavorites(code);
        } else {
            addToFavorites(code);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={`/country/${code}`} passHref>
                <Card sx={{ maxWidth: 345, mb: 2, cursor: 'pointer', position: 'relative' }}>
                    <CardMedia component="img" alt={`${name} flag`} height="140" image={flag} />
                    <CardContent>
                        <Typography variant="h5">{name}</Typography>
                        <Typography variant="body2" color="text.secondary">{region}</Typography>
                    </CardContent>
                    <IconButton
                        onClick={handleFavoriteToggle}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 1,
                            color: isFavorite ? '#ff8080' : 'gray',
                            border: '2px white solid',
                            background: '#1976d2',
                            cursor: 'pointer',
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        {isFavorite ? <Favorite /> : <FavoriteBorder sx={{ color: 'white' }} />}
                    </IconButton>
                </Card>
            </Link>
        </motion.div>
    );
};

export default CountryCard;
