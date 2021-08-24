import axios from "axios";

const createAPI = (onServerError, onUnauthorized) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (err) => {
    const {response} = err;
    const {status} = response;

    if (status === 404) {
      onServerError();
    } else if (status === 401) {
      onUnauthorized();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
