import axios from 'axios';
// import mongoose from 'mongoose';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;

