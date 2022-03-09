import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/user/member/profile/`;

export function getMemberProfile(memID) {
  return http
    .get(`${apiEndPoint}${memID}`)
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
