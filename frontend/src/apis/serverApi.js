import axios from "axios";
import { toastError, toastErrorCustom } from "../shared/toast";

export const domainName= process.env.REACT_APP_BACKEND_ENV;

const api = axios.create({
  baseURL: domainName,
});

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    toastErrorCustom(error)
    return Promise.reject(error)
  }
)


export default api;


