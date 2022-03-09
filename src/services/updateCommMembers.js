import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/user/commity/set/update`;

export function updateCommityPosition(position) {
  return http
    .post(apiEndPoint, position)
    .then(function (response) {
      toast.success(`${response.data.msg}`);
      // return response.data.data
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
