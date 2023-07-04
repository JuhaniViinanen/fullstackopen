const CountryItem = ({country, handleClick}) => {
    return (
        <li>
            {country.name.common}
            <button onClick={() => handleClick(country.name.common)}>show</button>
        </li>
    )
}

export default CountryItem
