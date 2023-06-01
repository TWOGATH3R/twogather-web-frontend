import axios from "axios";

const host = window.location.hostname === "localhost" 
  ? 'http://ec2-15-165-96-247.ap-northeast-2.compute.amazonaws.com:8080'
  : "api";

export const api = axios.create({
  baseURL: host,
});
