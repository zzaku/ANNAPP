// src/__tests__/components/CountryCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CountryCard from '../../components/CountryCard';
import { FavoritesProvider, useFavorites } from '../../contexts/FavoritesContext';

const useFavoritesMock = () => {
    const context = useFavorites();

    return {
        ...context,
        addToFavorites: vi.fn(),
        removeFromFavorites: vi.fn(),
    };
};

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <FavoritesProvider>
        {children}
    </FavoritesProvider>
);

describe('CountryCard', () => {
    it('should render country name, region, and flag', () => {
        const props = {
            code: 'FR',
            name: 'France',
            region: 'Europe',
            flag: 'https://restcountries.com/v3.1/flags/fr.png',
        };

        render(
            <Wrapper>
                <CountryCard {...props} />
            </Wrapper>
        );

        expect(screen.getByText('France')).toBeInTheDocument();
        expect(screen.getByText('Europe')).toBeInTheDocument();
        expect(screen.getByAltText('France flag')).toHaveAttribute('src', props.flag);
    });

    it('should toggle favorite status when clicking the favorite button', () => {
        const props = {
            code: 'FR',
            name: 'France',
            region: 'Europe',
            flag: 'https://restcountries.com/v3.1/flags/fr.png',
        };

        const { addToFavorites, removeFromFavorites } = useFavoritesMock();

        render(
            <Wrapper>
                <CountryCard {...props} />
            </Wrapper>
        );

        const favoriteButton = screen.getByRole('button');
        expect(favoriteButton).toBeInTheDocument();

        fireEvent.click(favoriteButton);
        expect(addToFavorites).toHaveBeenCalledWith(props.code);

        fireEvent.click(favoriteButton);
        expect(removeFromFavorites).toHaveBeenCalledWith(props.code);
    });
});
