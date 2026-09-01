
import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Loading from "./components/Loading";

import { fetchWeatherByCoords } from "./services/weatherApi";
import { searchCity } from "./services/geocodingApi";


function App() {

    // ==========================================
    // State
    // ==========================================

    const [weatherData, setWeatherData] = useState(null);

    const [city, setCity] = useState("Bengaluru");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [darkMode, setDarkMode] = useState(false);


    // ==========================================
    // Load Weather
    // ==========================================

    const loadWeather = async (
        latitude,
        longitude,
        cityName = ""
    ) => {

        try {

            setLoading(true);

            setError("");


            const data = await fetchWeatherByCoords(
                latitude,
                longitude
            );


            setWeatherData(data);


            if (cityName) {

                setCity(cityName);

            }

        } catch (error) {

            console.error(
                "Weather API Error:",
                error
            );


            setError(
                "Unable to load weather data."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // Search City
    // ==========================================

    const handleSearch = async (cityName) => {

        if (
            !cityName ||
            !cityName.trim()
        ) {

            return;

        }


        try {

            setLoading(true);

            setError("");


            // Search city using Geocoding API
            const location = await searchCity(
                cityName.trim()
            );


            // Load weather using city coordinates
            await loadWeather(
                location.latitude,
                location.longitude,
                location.name
            );


        } catch (error) {

            console.error(
                "City Search Error:",
                error
            );


            setLoading(false);


            setError(
                "City not found. Please try another city."
            );

        }

    };


    // ==========================================
    // Get Current Browser Location
    // ==========================================

    const handleLocation = () => {

        if (!navigator.geolocation) {

            setError(
                "Geolocation is not supported by your browser."
            );

            return;

        }


        setLoading(true);

        setError("");


        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const {
                    latitude,
                    longitude
                } = position.coords;


                await loadWeather(
                    latitude,
                    longitude
                );

            },


            (error) => {

                console.error(
                    "Location Error:",
                    error
                );


                setLoading(false);


                setError(
                    "Unable to access your location. Please allow location permission."
                );

            }

        );

    };


    // ==========================================
    // Load Bengaluru Initially
    // ==========================================

    useEffect(() => {

        handleSearch("Bengaluru");

    }, []);


    // ==========================================
    // Application UI
    // ==========================================

    return (

        <div
            className={
                darkMode
                    ? "app dark"
                    : "app"
            }
        >

            {/* ==================================
                Header
            ================================== */}

            <Header
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />


            {/* ==================================
                Main
            ================================== */}

            <main>

                {/* Search Bar */}

                <SearchBar
                    onSearch={handleSearch}
                    onLocation={handleLocation}
                />


                {/* Error Message */}

                {error && (

                    <div className="error">

                        ⚠️ {error}

                    </div>

                )}


                {/* ==================================
                    Loading
                ================================== */}

                {loading ? (

                    <Loading />

                ) : weatherData ? (

                    <>

                        {/* ==================================
                            Location
                        ================================== */}

                        <div className="location-title">

                            <h1>
                                📍 {city}
                            </h1>


                            <p>

                                Latitude:{" "}

                                {weatherData.latitude.toFixed(2)}

                                {" | "}

                                Longitude:{" "}

                                {weatherData.longitude.toFixed(2)}

                            </p>

                        </div>


                        {/* ==================================
                            Current Weather
                        ================================== */}

                        <CurrentWeather

                            current={
                                weatherData.current
                            }

                            units={
                                weatherData.current_units
                            }

                        />


                        {/* ==================================
                            FEVEN Day Forecast
                        ================================== */}

                        <Forecast

                            daily={
                                weatherData.daily
                            }

                            units={
                                weatherData.daily_units
                            }

                        />

                    </>

                ) : (

                    <div className="no-data">

                        <h2>
                            No weather data available
                        </h2>

                        <p>
                            Search for a city to see the weather.
                        </p>

                    </div>

                )}

            </main>


            {/* ==================================
                Footer
            ================================== */}

            <footer>

                <p>
                    🌤️ SK Weather Dashboard 
                </p>


                <p>
                   
                    Weather data provided by Open-Meteo
            
                </p>

            </footer>

        </div>

    );

}


export default App;