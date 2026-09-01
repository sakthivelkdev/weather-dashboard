
const BASE_URL =
    "https://geocoding-api.open-meteo.com/v1/search";


// Search multiple cities
export const searchCities = async (cityName) => {

    if (!cityName || !cityName.trim()) {
        return [];
    }


    try {

        const url =
            `${BASE_URL}?` +
            `name=${encodeURIComponent(cityName.trim())}` +
            `&count=100` +
            `&language=en` +
            `&format=json`;


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error(
                `Geocoding API failed: ${response.status}`
            );

        }


        const data = await response.json();


        if (
            !data.results ||
            data.results.length === 0
        ) {

            return [];

        }


        const cities = data.results.map((location) => ({

            name: location.name,

            latitude: location.latitude,

            longitude: location.longitude,

            country: location.country || "",

            countryCode: location.country_code || "",

            state: location.admin1 || "",

            population: location.population || 0

        }));


        // Remove duplicate city + country combinations
        const uniqueCities = cities.filter(
            (city, index, array) =>
                index === array.findIndex(
                    (item) =>
                        item.name === city.name &&
                        item.country === city.country
                )
        );


        // Sort alphabetically by city name
        uniqueCities.sort((a, b) => {

            const nameCompare =
                a.name.localeCompare(
                    b.name,
                    undefined,
                    {
                        sensitivity: "base"
                    }
                );


            if (nameCompare !== 0) {
                return nameCompare;
            }


            return a.country.localeCompare(
                b.country
            );

        });


        return uniqueCities;

    } catch (error) {

        console.error(
            "City Search Error:",
            error
        );

        throw error;

    }
};


// Get the first/best matching city
export const searchCity = async (cityName) => {

    const cities =
        await searchCities(cityName);


    if (cities.length === 0) {

        throw new Error(
            "City not found"
        );

    }


    return cities[0];

};
