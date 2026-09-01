
import ForecastCard from "./ForecastCard";


function Forecast({ daily, units }) {

    if (!daily || !daily.time) {
        return null;
    }


    return (
        <section className="forecast-section">

            <div className="forecast-header">

                <div>
                    <h2>7-Day Forecast</h2>

                    <p>
                        Daily weather forecast
                    </p>
                </div>

                <div className="forecast-icon">
                    📅
                </div>

            </div>


            <div className="forecast-grid">

                {daily.time.map((date, index) => (

                    <ForecastCard

                        key={date}

                        date={date}

                        maxTemperature={
                            daily.temperature_2m_max?.[index]
                        }

                        minTemperature={
                            daily.temperature_2m_min?.[index]
                        }

                        weatherCode={
                            daily.weather_code?.[index]
                        }

                        temperatureUnit={
                            units?.temperature_2m_max || "°C"
                        }

                    />

                ))}

            </div>

        </section>
    );
}


export default Forecast;






