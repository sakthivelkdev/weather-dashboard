
function ForecastCard({
    date,
    maxTemperature,
    minTemperature,
    weatherCode,
    temperatureUnit
}) {


    // Convert Open-Meteo weather codes into icons
    const getWeatherIcon = (code) => {

        if (code === 0) {
            return "☀️";
        }

        if (
            code === 1 ||
            code === 2
        ) {
            return "🌤️";
        }

        if (code === 3) {
            return "☁️";
        }

        if (
            code === 45 ||
            code === 48
        ) {
            return "🌫️";
        }

        if (
            code >= 51 &&
            code <= 57
        ) {
            return "🌦️";
        }

        if (
            code >= 61 &&
            code <= 67
        ) {
            return "🌧️";
        }

        if (
            code >= 71 &&
            code <= 77
        ) {
            return "❄️";
        }

        if (
            code >= 80 &&
            code <= 82
        ) {
            return "🌦️";
        }

        if (
            code >= 85 &&
            code <= 86
        ) {
            return "🌨️";
        }

        if (code >= 95) {
            return "⛈️";
        }

        return "🌤️";
    };


    // Weather description
    const getWeatherDescription = (code) => {

        if (code === 0) {
            return "Clear sky";
        }

        if (code === 1) {
            return "Mainly clear";
        }

        if (code === 2) {
            return "Partly cloudy";
        }

        if (code === 3) {
            return "Overcast";
        }

        if (
            code === 45 ||
            code === 48
        ) {
            return "Foggy";
        }

        if (
            code >= 51 &&
            code <= 57
        ) {
            return "Drizzle";
        }

        if (
            code >= 61 &&
            code <= 67
        ) {
            return "Rain";
        }

        if (
            code >= 71 &&
            code <= 77
        ) {
            return "Snow";
        }

        if (
            code >= 80 &&
            code <= 82
        ) {
            return "Rain showers";
        }

        if (
            code >= 85 &&
            code <= 86
        ) {
            return "Snow showers";
        }

        if (code >= 95) {
            return "Thunderstorm";
        }

        return "Weather";
    };


    return (
        <article className="forecast-card">

            {/* Day */}

            <h3>

                {new Date(date).toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                )}

            </h3>


            {/* Date */}

            <p className="forecast-date">

                {new Date(date).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric"
                    }
                )}

            </p>


            {/* Weather Icon */}

            <div className="forecast-weather-icon">

                {getWeatherIcon(weatherCode)}

            </div>


            {/* Weather Description */}

            <p className="forecast-description">

                {getWeatherDescription(weatherCode)}

            </p>


            {/* Temperatures */}

            <div className="forecast-temperatures">

                <div>

                    <span>
                        High
                    </span>

                    <strong>

                        {Math.round(
                            maxTemperature
                        )}

                        {temperatureUnit}

                    </strong>

                </div>


                <div>

                    <span>
                        Low
                    </span>

                    <strong>

                        {Math.round(
                            minTemperature
                        )}

                        {temperatureUnit}

                    </strong>

                </div>

            </div>

        </article>
    );
}


export default ForecastCard;
