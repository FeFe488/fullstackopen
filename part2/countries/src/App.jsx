import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const api_key = import.meta.env.VITE_SOME_KEY
    
    

    if (capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [capital])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {weather.main.temp} Celsius</div>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description} 
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

const Countries = ({ countries, setSearch }) => {
  if (countries.length === 0) {
    return null
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.common}>
            {country.name.common} 
            <button onClick={() => setSearch(country.name.common)}>
              show
            </button>
          </div>
        ))}
      </div>
    )
  }

  const country = countries[0]
  const capital = country.capital ? country.capital[0] : null

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {capital ? capital : "N/A"}</div>
      <div>area {country.area}</div>
      
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="150" 
      />

      {capital && <Weather capital={capital} />}
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredCountries = search
    ? countries.filter(country => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : []

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <Countries countries={filteredCountries} setSearch={setSearch} />
    </div>
  )
}

export default App