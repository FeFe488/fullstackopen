
import axios from "axios"

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'


const getCountry=()=>{
    const request= axios.get(baseURL)
    console.log(request)
    return request.then(c=>c.data)
    
}



export default {getCountry}