import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CountryCard from '../components/CountryCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { fetchCountries } from '../utils/api';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const FavoritesPage = () => {
    const { favorites } = useFavorites();
    const [countries, setCountries] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);
            } finally {
                setLoading(false);
            }
        };

        getCountries();
    }, []);

    const favoriteCountries = countries.filter((country) =>
        favorites.includes(country.translations.fra.common)
    );

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Favorite Countries
            </Typography>

            {loading ? (
                <Loading />
            ) : (
                <Grid container spacing={3}>
                    {favoriteCountries.map((country) => (
                        <Grid item xs={12} sm={6} md={4} key={country.cca3}>
                            <CountryCard
                                code={country.cca3}
                                name={country.translations.fra.common}
                                region={country.region}
                                flag={country.flags.png}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default FavoritesPage;
