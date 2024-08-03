export const fetchCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();

        const filteredData = data.filter((country: any) => country.cca3 !== 'ISR');

        return filteredData;
    } catch (error) {
        console.error('Erreur lors de la récupération des pays:', error);
        return [];
    }
};

export const fetchCountryByName = async (name: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await res.json();
    return data;
};

export const fetchCountryByCode = async (code: string) => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await response.json();
    return data;
};
