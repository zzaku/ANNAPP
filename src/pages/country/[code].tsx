// src/pages/country/[code].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CountryDetails from '../../components/CountryDetails';
import { fetchCountryByCode } from '../../utils/api';
import { useFavorites } from '@/contexts/FavoritesContext';
import Loading from '@/components/Loading';

const CountryPage = () => {
    const router = useRouter();
    const { code } = router.query;
    const [country, setCountry] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

    useEffect(() => {
        if (code) {
            const getCountry = async () => {
                try {
                    const data = await fetchCountryByCode(code as string);

                    setCountry(data[0]);
                } finally {
                    setLoading(false);
                }
            };

            getCountry();
        }
    }, [code]);

    useEffect(() => {
        if (country) {
            setIsFavorite(favorites.includes(country.cca3));
        }
    }, [favorites, country]);

    if (!country) return null;

    const handleFavoriteClick = () => {

        if (isFavorite) {
            removeFromFavorites(country.cca3);
        } else {
            addToFavorites(country.cca3);
        }
        setIsFavorite(!isFavorite);
    };

    if (loading) return <Loading />;

    return (
        <div>
            <CountryDetails
                name={country.translations.fra.common}
                region={country.region}
                officialName={country.name.official}
                timeZone={country.timezones ? country.timezones[0] : 'N/A'}
                capital={country.capital ? country.capital[0] : 'N/A'}
                languages={Object.values(country.languages)}
                population={country.population}
                flag={country.flags.svg}
                handleFavoriteToggle={handleFavoriteClick}
                code={country.cca3}
            />
        </div>
    );
};

export default CountryPage;
