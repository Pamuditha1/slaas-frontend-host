import http from "./httpService"
import { toast } from "react-toastify";
import {api} from './api'

const apiEndPoint = `${api}/user/member-request/update`;

export function updateMemberRequest(status) {

    return http.post(apiEndPoint, status)
    .then(function (response) {
        console.log(response.msg);
        toast.success(`${response.data}`);
        return "Member"
        // return response.data.data
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

