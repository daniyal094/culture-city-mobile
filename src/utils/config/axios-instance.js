import axios from 'axios';

const instance = axios.create({
    baseURL: `https://dev.cultureinyourcity.com/api/v1`
});

export default instance