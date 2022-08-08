import axios from "axios";

export const initInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        alert("You are not authorized");
      }
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
      }
      return Promise.reject(error.message);
    }
  );
};
