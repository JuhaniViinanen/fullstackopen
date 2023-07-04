import {useState, useEffect} from "react"
import SearchField from "./components/SearchField"
import CountriesList from "./components/CountriesList"
import DetailedCountryView from "./components/DetailedCountryView"

import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get(`${baseURL}/all`)
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
    )

  let content
  if (countriesToShow.length > 10) {
    content = <div>Too many matches, specify another filter</div>
  } else if (countriesToShow.length > 1) {
    content = <CountriesList countries={countriesToShow} />
  } else if (countriesToShow.length === 1) {
    content = <DetailedCountryView country={countriesToShow[0]} />
  } else {
    content = <div></div>
  }

  return (
    <div>
      <SearchField value={search} handleChange={e => setSearch(e.target.value)} />
      {content}
    </div>
    
  )
}

export default App;
