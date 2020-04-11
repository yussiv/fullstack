import React, {useEffect, useState} from 'react';
import axios from 'axios'


const SearchForm = ({query, handleQueryChange}) => (
  <div>
    find countries <input value={query} onChange={handleQueryChange} />
  </div>
)

const WeatherInfo = ({weather, noApiKey}) => {
  if (noApiKey) {
    return <div>[No WeatherStack API key specified]</div>

  } else if (weather !== undefined && Object.keys(weather).length !== 0) {
    return (
      <div>
        <div><strong>temperature:</strong> {weather.temperature} Celsius</div>
        {weather.weather_icons.map(icon => <img alt="icon" key={icon} src={icon} />)}
        <div><strong>wind:</strong> {weather.wind_speed} mph, direction {weather.wind_dir}</div>
      </div>
    )
  } else {
    return <div>loading...</div>
  }
}

const Country = ({country}) => {
  const [weather, setWeather] = useState({})
  const API_KEY = process.env.REACT_APP_WEATHERSTACK_API

  useEffect(() => {
    if (API_KEY) {
      axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
    }
  }, [country.capital, API_KEY])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
      <h2>Weather in {country.capital}</h2>
      <WeatherInfo weather={weather} noApiKey={API_KEY === undefined} />
    </div>
  )
}

const Results = ({countries, query, handleShowCountry}) => {
  query = query.toLowerCase()
  const filtered = countries.filter(
    country => country.name.toLowerCase().indexOf(query) > -1)

  if (filtered.length === 0) {
    return <div>No matching entries, try something else</div>
  } 
  else if (filtered.length === 1) {
    return <Country country={filtered[0]} />
  } 
  else if (filtered.length <= 10) {
    return filtered.map(country => (
      <div key={country.name}>
        {country.name} <button onClick={handleShowCountry(country.name)}>show</button>
      </div>
    ))
  } 
  else {
    return <div>Too many matches, specify another filter</div>
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { setCountries(response.data) })
  }, [])

  const handleQueryChange = (event) => { setQuery(event.target.value) }
  const handleShowCountry = (country) => () => { setQuery(country) }
  
  return (
    <div>
      <SearchForm query={query} handleQueryChange={handleQueryChange} />
      <Results countries={countries} query={query} handleShowCountry={handleShowCountry} />
    </div>
  );
}

export default App;
