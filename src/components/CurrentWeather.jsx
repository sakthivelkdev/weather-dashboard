
function CurrentWeather({ current, units }) {

    if (!current || !units) {
        return null;
    }


    return (
        <section className="current-weather">

            <div className="current-header">

                <div>
                    <h2>Current Weather</h2>

                    <p>
                        {new Date(
                            current.time
                        ).toLocaleString()}
                    </p>
                </div>

                <div className="current-icon">
                    🌤️
                </div>

            </div>


            <div className="temperature">

                <span>
                    🌡️
                </span>

                <strong>
                    {current.temperature_2m}
                    {units.temperature_2m}
                </strong>

            </div>


            <div className="weather-details">

                <div className="weather-detail">

                    <div className="detail-icon">
                        💨
                    </div>

                    <div>
                        <span>
                            Wind Speed
                        </span>

                        <strong>
                            {current.wind_speed_10m}{" "}
                            {units.wind_speed_10m}
                        </strong>
                    </div>

                </div>


                <div className="weather-detail">

                    <div className="detail-icon">
                        🕐
                    </div>

                    <div>
                        <span>
                            Observation Time
                        </span>

                        <strong>
                            {new Date(
                                current.time
                            ).toLocaleTimeString()}
                        </strong>
                    </div>

                </div>

            </div>

        </section>
    );
}


export default CurrentWeather;
