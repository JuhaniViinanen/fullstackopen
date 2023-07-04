const DetailedCountryView = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>{`Capital: ${country.capital}`}</div>
            <div>{`Area: ${country.area} km2`}</div>
            <h3>Languages:</h3>
            <ul>
                {Object.keys(country.languages).map(key => 
                <li key={key}>{country.languages[key]}</li>
                    )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default DetailedCountryView
