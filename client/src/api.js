import axios from "axios";

const getBaseURL = () => {
  const { hostname } = window.location;

  return `http://${hostname}:3001`; 
};


const createApi = axios.create({
  baseURL: getBaseURL(),
});

export default createApi;
