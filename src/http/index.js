// https://github.com/axios/axios
import axios from "axios";

// https://github.com/axios/axios#request-config
let axiosHttp = axios.create({
  baseURL: "//api.giphy.com",
  timeout: 60000
});

axiosHttp.interceptors.request.use(
  config => {
    const credentials = {
      api_key: "dc6zaTOxFJmzC"
    };

    if (config.method === "get") {
      config.params = { ...config.params, ...credentials };
    } else {
      config.data = { ...config.data, ...credentials };
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosHttp;
