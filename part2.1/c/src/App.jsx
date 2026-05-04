import { useEffect, useState } from "react"
import axios from "axios"
import countrySearch from "./services/countrys"


const App=()=>{
  

  // const p= new Promise((resolve,reject)=>{
  //   const schoko= 4

  //   if (schoko>2){
  //     resolve("essen");
  //   }else{
  //     reject("nicht essen");
  // }

  // })

  // p.then(value=>{
  //   console.log(value)
  // })

  const [input,setInput]=useState("")
  const [country,setCountry]= useState([])

  const handleCountrychange=(e)=>{
    setInput(e.target.value)
  }

  useEffect(()=>{
    countrySearch
    .getCountry()
    .then(initialData=>{
      setCountry(initialData)
    }) 
    },[])

    const countriesToShow=country.filter(country=>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    )


  return(
    <>
    <div>
      <h1>Countries search</h1>
      find counties:
      <input 
      value={input}
      onChange={handleCountrychange}
      />


    <ul>
      {countriesToShow.map(country=>
      <li key={country.name.common}> {country.name.common}</li>
      )}
    
    </ul>
      
      
      </div></>
  )


}
export default App
