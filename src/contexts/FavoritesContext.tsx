import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface FavoritesContextType {
    favorites: string[];
    addToFavorites: (country: string) => void;
    removeFromFavorites: (country: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'favorites';

const getFavoritesFromLocalStorage = (): string[] => {
    const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const setFavoritesToLocalStorage = (favorites: string[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const storedFavorites = getFavoritesFromLocalStorage();
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        setFavoritesToLocalStorage(favorites);
    }, [favorites]);

    const addToFavorites = (country: string) => {
        setFavorites((prevFavorites) => {
            const newFavorites = [...prevFavorites, country];
            setFavoritesToLocalStorage(newFavorites);
            return newFavorites;
        });
    };

    const removeFromFavorites = (country: string) => {
        setFavorites((prevFavorites) => {
            const newFavorites = prevFavorites.filter((favorite) => favorite !== country);
            setFavoritesToLocalStorage(newFavorites);
            return newFavorites;
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
