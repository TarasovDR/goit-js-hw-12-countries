import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name';

export default function fetchCountries(searchQuery) {
  return axios
    .get(`/${searchQuery}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}
