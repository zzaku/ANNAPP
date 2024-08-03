// src/__tests__/components/CountryDetails.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CountryDetails from '../../components/CountryDetails';
import { FavoritesProvider } from '../../contexts/FavoritesContext';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <FavoritesProvider>
        {children}
    </FavoritesProvider>
);

describe('CountryDetails', () => {
    it('should render country details correctly', () => {
        const props = {
            name: 'France',
            region: 'Europe',
            officialName: 'French Republic',
            timeZone: 'UTC+1',
            capital: 'Paris',
            languages: ['French'],
            population: 67000000,
            flag: 'https://restcountries.com/v3.1/flags/fr.png',
            handleFavoriteToggle: vi.fn(),
            code: 'FR',
        };

        render(
            <Wrapper>
                <CountryDetails {...props} />
            </Wrapper>
        );

        expect(screen.getByText('France')).toBeInTheDocument();
        expect(screen.getByText('Official Name: French Republic')).toBeInTheDocument();
        expect(screen.getByText('Capital: Paris')).toBeInTheDocument();
        expect(screen.getByText('Population: 67000000')).toBeInTheDocument();
        expect(screen.getByText('TimeZone: UTC+1')).toBeInTheDocument();
        expect(screen.getByText('Region: Europe')).toBeInTheDocument();
        expect(screen.getByText('Languages: French')).toBeInTheDocument();
        expect(screen.getByAltText('France flag')).toHaveAttribute('src', props.flag);
    });

    it('should call handleFavoriteToggle on button click', () => {
        const props = {
            name: 'France',
            region: 'Europe',
            officialName: 'French Republic',
            timeZone: 'UTC+1',
            capital: 'Paris',
            languages: ['French'],
            population: 67000000,
            flag: 'https://restcountries.com/v3.1/flags/fr.png',
            handleFavoriteToggle: vi.fn(),
            code: 'FR',
        };

        render(
            <Wrapper>
                <CountryDetails {...props} />
            </Wrapper>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(props.handleFavoriteToggle).toHaveBeenCalled();
    });

    it('should display favorite icon correctly based on favorite status', () => {
        const props = {
            name: 'France',
            region: 'Europe',
            officialName: 'French Republic',
            timeZone: 'UTC+1',
            capital: 'Paris',
            languages: ['French'],
            population: 67000000,
            flag: 'https://restcountries.com/v3.1/flags/fr.png',
            handleFavoriteToggle: vi.fn(),
            code: 'FR',
        };

        const { container } = render(
            <FavoritesProvider>
                <CountryDetails {...props} />
            </FavoritesProvider>
        );

        // vérif du bouton icon
        const button = screen.getByRole('button');
        const favoriteIcon = container.querySelector('svg');

        // Le bouton ne dois pas être en favoris par défaut
        expect(button).toHaveTextContent('Ajouter aux favoris');
        expect(favoriteIcon).toHaveAttribute('data-testid', 'FavoriteBorder');

        // Pour le déclancher le clique sur le bouton favoris
        fireEvent.click(button);

        expect(button).toHaveTextContent('Retirer des favoris');
        expect(favoriteIcon).toHaveAttribute('data-testid', 'Favorite');
    });
});
