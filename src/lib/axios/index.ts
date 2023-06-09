import axios from 'axios';

export default axios;
export const stravaApi = axios.create({
  baseURL: 'https://www.strava.com/',
});
