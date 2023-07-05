import {useState, useEffect} from "react"
import WeatherDetails from "./WeatherDetails"

import axios from "axios"

const baseURL = "https://api.openweathermap.org/data/2.5/weather?"
const api_key = process.env.REACT_APP_API_KEY

const DetailedCountryView = ({country}) => {
    const [weatherData, setWeatherData] = useState(null)
    const [lat, lon] = country.capitalInfo.latlng

    useEffect(() => {
        axios
          .get(`${baseURL}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
          .then(response => setWeatherData(response.data))
    }, [])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>{`Capital: ${country.capital}`}</div>
            <div>{`Area: ${country.area} km2`}</div>
            <h3>Languages:</h3>
            <ul>
                {Object.keys(country.languages).map(key => 
                <li key={key}>{country.languages[key]}</li> )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            {weatherData && <WeatherDetails name={country.capital} data={weatherData} /> }
        </div>
    )
}

export default DetailedCountryView
