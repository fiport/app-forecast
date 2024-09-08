import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://local.api.realtime.com.br/api/v1/',
});

export default instance;
