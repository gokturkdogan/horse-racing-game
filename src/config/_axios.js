import axios from 'axios';
const BASE_API_URL= "https://67b44fe2392f4aa94faa4c58.mockapi.io/";

const Services = axios.create({baseURL: String(BASE_API_URL)});
 
export default Services;