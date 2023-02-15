import axios, { AxiosError } from "axios";

const request = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 20000,
});

export { request };
