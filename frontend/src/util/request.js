import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export default async function request(method, url, data = {}, headers = {}) {
    try {
        const response = await axios({
          method: method,
          url: baseURL + url,
          data: data,
          headers: { "Content-Type": "application/json", ...headers }
        });
        return response.data;
    }
    catch(e) {
        return false;
    }
}