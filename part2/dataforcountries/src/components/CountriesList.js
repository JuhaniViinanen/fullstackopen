import CountryItem from "./CountryItem"

const CountriesList = ({countries, handleClick}) => {
    return (
        <ul className="countrieslist">
            {countries.map(country => 
              <CountryItem 
                key={country.name.common} 
                country={country} 
                handleClick={handleClick} 
              />
            )}
        </ul>
    )
}

export default CountriesList
