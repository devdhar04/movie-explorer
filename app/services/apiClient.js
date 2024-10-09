import axios from 'axios';
import { API_CONFIG } from './apiConfig'; 

const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: API_CONFIG.HEADERS.AUTHORIZATION,
        Accept: API_CONFIG.HEADERS.ACCEPT,
      },
  });

  export default apiClient;