import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/user/add-profilepic`;

export function addProfilePic(formData, nameOfImage) {
  return http
    .post(apiEndPoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        NameOfImage: nameOfImage,
      },
    })
    .then(function (response) {
      // toast.success(`${response.data}`);
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

// import http from "./httpService"
// import { toast } from "react-toastify";
// import {api} from './api'

// const apiEndPoint = `${api}/user/add-profilepic`;

// export function addProfilePic(url, nic) {

//     return http.post(apiEndPoint, {url, nic})
//     .then(function (response) {
//         console.log(response);
//         toast.success(`${response.data}`);
//     })
//     .catch(function (error) {
//         if(error.response.data) {
//             console.log(error.response.data);
//             toast.error(error.response.data);
//         }
//         if(error.response) {
//             console.log(error.response);
//             toast.error(error.response);
//         }
//         else {
//             console.log(error);
//             toast.error(error);
//         }

//     });

// }
