import axios from "axios";
export const apiKey = 'AIzaSyD2IRoLt1K6BrhiEfNZR88efTl9zEXz86g'
export const http = axios.create({
    baseURL: `https://www.googleapis.com/books/v1`,
})