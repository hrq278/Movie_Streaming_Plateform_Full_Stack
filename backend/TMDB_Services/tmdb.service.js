import axios from 'axios';
import { ApiError } from '../utils/ApiError.js';

export const fetchTMDB = async (url) => {

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`
  }
};

try {
    const response = await axios.get(url, options)
    
    return response.data;
    
} catch (error) {
    throw new ApiError(500, error.message  || "internal Sever Error in TMDB Service")
}   
}