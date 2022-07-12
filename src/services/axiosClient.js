import axios from "axios";
import queryString from "query-string";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return {
      "x-access-token": user.accessToken,
    };
  } else {
    return {};
  }
};

// https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // headers: {
  //   "Access-Control-Allow-Origin": "http://localhost:3000", // withCredentail bắt buộc phải có
  //   "Access-Control-Allow-Credentials": "true", // withCredentail bắt buộc phải có,
  // },
  //headers: getAuthHeader(), // Khi chạy lần đầu tiên thì sau nó sẽ không chạy lại nữa
  paramsSerializer: (params) => queryString.stringify(params),
  timeout: 10000,
  //withCredentials: true,
});
axiosClient.interceptors.request.use(async (config) => {
  // Mỗi lần request sẽ chạy lại để config
  // Handle token here
  config.headers = getAuthHeader();
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("user");
      window.location.replace("/");
      return;
    }
    throw error;
  }
);

export default axiosClient;
/*
If I use the default headers for the set token when I want to renew the token, it's can not set again into the header. is it correct? So i have to use the interceptors.
*/
