import {useState, useEffect} from "react"
import SearchField from "./components/SearchField"
import CountriesList from "./components/CountriesList"
import DetailedCountryView from "./components/DetailedCountryView"

import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [focus, setFocus] = useState("")

  useEffect(() => {
    axios
      .get(`${baseURL}/all`)
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
    )

  const clickHandler = name => {
    setFocus(countries.find(country => country.name.common === name))
  }

  const searchHandler = e => {
    setFocus("")
    setSearch(e.target.value)
  }

  let content
  if (focus !== "") {
    content = <DetailedCountryView country={focus} />
  } else if (countriesToShow.length > 10) {
    content = <div>Too many matches, specify another filter</div>
  } else if (countriesToShow.length > 1) {
    content = <CountriesList 
      countries={countriesToShow} 
      handleClick={clickHandler} 
    />
  } else if (countriesToShow.length === 1) {
    content = <DetailedCountryView country={countriesToShow[0]} />
  } else {
    content = <div></div>
  }

  return (
    <div>
      <SearchField value={search} handleChange={searchHandler} />
      {content}
    </div>
    
  )
}

export default App;
