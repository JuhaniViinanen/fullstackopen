const WeatherDetails = ({name, data}) => {

    return (
        <div>
            <h3>{`Current weather in ${name}`}</h3>
            <div>{`Temperature is ${data.main.temp} Celcius`}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
              alt={data.weather[0].description} 
            />
            <div>{`Wind speed is ${data.wind.speed} m/s`}</div>
        </div>
    )
}

export default WeatherDetails
