import CountryItem from "./CountryItem"

const CountriesList = ({countries}) => {
    return (
        <ul className="countrieslist">
            {countries.map(country => 
              <CountryItem key={country.name.common} country={country} />
            )}
        </ul>
    )
}

export default CountriesList
