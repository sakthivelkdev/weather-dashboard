
const BASE_URL =
    "https://api.open-meteo.com/v1/forecast";


export const fetchWeatherByCoords = async (
    latitude,
    longitude
) => {

    const url =
        `${BASE_URL}?` +
        `latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,wind_speed_10m` +
        `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
        `&timezone=auto`;


    try {

        const response = await fetch(url);


        if (!response.ok) {

            throw new Error(
                `Weather API failed: ${response.status}`
            );

        }


        const data = await response.json();


        console.log(
            "Open-Meteo Weather Data:",
            data
        );


        return data;

    } catch (error) {

        console.error(
            "Weather API Error:",
            error
        );

        throw error;

    }
};
