import http from "./httpService"
import { toast } from "react-toastify";
import {api} from './api'

const apiEndPoint = `${api}/user/register-member`;

export function registerMember(member) {

    return http.post(apiEndPoint, member)
    .then(function (response) {
        console.log(response.data);
        toast.success(`${response.data.msg}`);
        return response.data
    })
    .catch(function (error) {
        if(error.response.data) {
            console.log(error.response.data);
            toast.error(error.response.data);
            return error.response.data
        }
        if(error.response) {
            console.log(error.response);
            toast.error(error.response);
            // return response.data
        }
        else {
            console.log(error);
            toast.error(error);
            // return response.data
        }

    });

}

