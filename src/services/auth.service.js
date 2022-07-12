/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import axiosClient from "./axiosClient";

const AuthService = {
  register: (params) => {
    return axiosClient.post("/auth/signup", {
      params: params,
    });
  },
  login: (params) => {
    return axiosClient.post("/auth/signin", params).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  },
  logout: () => {
    localStorage.removeItem("user");
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
};

export default AuthService;
