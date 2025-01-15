import axios from "axios";

export const domain = axios.create({
  baseURL: "https://cuulongtourbe.onrender.com",
});

domain.interceptors.response.use(function (response) {
  return response;

});
