import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/login-user/admin`;

export function adminLogin(loginData) {
  return http
    .post(apiEndPoint, loginData)
    .then(function (response) {
      toast.success(`${response.data.msg}`);
      return response.data;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
      if (error.response) {
        console.log(error.response);
        toast.error(error.response);
      } else {
        console.log(error);
        toast.error(error);
      }
      return {};
    });
}
