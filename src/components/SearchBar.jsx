
import { useEffect, useState } from "react";

import { searchCities } from "../services/geocodingApi";


function SearchBar({ onSearch, onLocation }) {

    const [searchText, setSearchText] = useState("");

    const [cities, setCities] = useState([]);

    const [searching, setSearching] = useState(false);


    // ==========================================
    // Search city suggestions
    // ==========================================

    useEffect(() => {

        if (
            !searchText ||
            searchText.trim().length < 1
        ) {

            setCities([]);

            return;

        }


        const timer = setTimeout(
            async () => {

                try {

                    setSearching(true);


                    const results =
                        await searchCities(
                            searchText.trim()
                        );


                    setCities(results);


                } catch (error) {

                    console.error(
                        "City suggestion error:",
                        error
                    );


                    setCities([]);

                } finally {

                    setSearching(false);

                }

            },
            400
        );


        return () => {
            clearTimeout(timer);
        };

    }, [searchText]);


    // ==========================================
    // Submit search
    // ==========================================

    const handleSubmit = (event) => {

        event.preventDefault();


        const value =
            searchText.trim();


        if (!value) {
            return;
        }


      setCities([]);
      setSearchText("");


        onSearch(value);

    };


    // ==========================================
    // Select city
    // ==========================================

  const handleCityClick = (city) => {

    setCities([]);

    setSearchText("");

    onSearch(city.name);
};


    return (

        <div className="search-container">

            <form
                className="search-form"
                onSubmit={handleSubmit}
            >

                {/* Search Input */}

                <div className="search-input-wrapper">

                    <span className="search-icon">
                        🔍
                    </span>


                    <input
                        type="text"
                        value={searchText}
                        onChange={(event) =>
                            setSearchText(
                                event.target.value
                            )
                        }
                        placeholder="Search for a city..."
                        autoComplete="off"
                    />


                    {searching && (

                        <span className="search-loading">
                            ⏳
                        </span>

                    )}


                    {/* ==================================
                        Suggestions
                    ================================== */}

                    {cities.length > 0 && (

                        <div className="city-suggestions">

                            <div className="suggestions-header">

                                <span>
                                    City suggestions
                                </span>

                                <span>
                                    {cities.length}
                                </span>

                            </div>


                            <div className="suggestions-list">

                                {cities.map(
                                    (city, index) => (

                                        <button
                                            type="button"
                                            className="city-suggestion"
                                            key={
                                                `${city.name}-${city.country}-${index}`
                                            }
                                            onClick={() =>
                                                handleCityClick(
                                                    city
                                                )
                                            }
                                        >

                                            <span className="city-icon">
                                                📍
                                            </span>


                                            <span className="city-information">

                                                <strong>
                                                    {city.name}
                                                </strong>


                                                <small>

                                                    {city.state
                                                        ? `${city.state}, `
                                                        : ""}

                                                    {city.country}

                                                </small>

                                            </span>

                                        </button>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </div>


                {/* Search Button */}

                <button
                    type="submit"
                    className="search-button"
                >

                    🔍 Search

                </button>


                {/* Location Button */}

                <button
                    type="button"
                    className="location-button"
                    onClick={onLocation}
                >

                    📍 My Location

                </button>

            </form>

        </div>

    );

}


export default SearchBar;
