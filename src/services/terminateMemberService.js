import http from "./httpService"
import { toast } from "react-toastify";
import {api} from './api'

const apiEndPoint = `${api}/user/terminate-member/`;

export function terminateMember(memNo) {

    console.log(memNo)
    console.log(typeof memNo)

    return http.post(`${apiEndPoint}${memNo}`)
    .then(function (response) {
        console.log(response.data);
        toast.dark(`${response.data}`);
        // return response.data
    })
    .catch(function (error) {
        if(error.response.data) {
            console.log(error.response.data);
            toast.error(error.response.data);
        }
        if(error.response) {
            console.log(error.response);
            toast.error(error.response);
        }
        else {
            console.log(error);
            toast.error(error);
        }

    });

}

