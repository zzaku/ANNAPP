// src/components/CountryDetails.tsx
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { Favorite, FavoriteBorder, LocationCity, People, AccessTime, Map, Language } from '@mui/icons-material';
import { useFavorites } from '../contexts/FavoritesContext';
import { motion } from 'framer-motion';

interface CountryDetailsProps {
    name: string;
    region: string;
    officialName: string;
    timeZone: string;
    capital: string;
    languages: string[];
    population: number;
    flag: string;
    handleFavoriteToggle: () => void;
    code: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ name, region, officialName, timeZone, capital, languages, population, flag, handleFavoriteToggle, code }) => {
    const { favorites } = useFavorites();
    const isFavorite = favorites.includes(code);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
        >
            <Card sx={{ maxWidth: 600, mx: 'auto' }}>
                <CardMedia component="img" alt={`${name} flag`} height="300" image={flag} />
                <CardContent>
                    <Typography variant="h4" gutterBottom>{name}</Typography>
                    <Typography variant="h6">Official Name: {officialName}</Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationCity sx={{ mr: 1 }} /> Capital: {capital || 'N/A'}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <People sx={{ mr: 1 }} /> Population: {population}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ mr: 1 }} /> TimeZone: {timeZone || 'N/A'}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Map sx={{ mr: 1 }} /> Region: {region}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Language sx={{ mr: 1 }} /> Languages: {languages.join(', ')}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color={isFavorite ? 'error' : 'primary'}
                            startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                            onClick={handleFavoriteToggle}
                            sx={{ mt: 2, transition: 'background-color 0.3s' }}
                        >
                            {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default CountryDetails;
