import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/user/mailsettings`;

export function getOneMailSettings(id) {
  return http
    .get(`${apiEndPoint}/${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      if (error.response) {
        console.log(error.response);
        toast.error(error.response);
      } else {
        console.log(error);
        toast.error(error);
      }
    });
}
