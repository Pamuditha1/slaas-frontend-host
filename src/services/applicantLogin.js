import http from "./httpService"
import { toast } from "react-toastify";
import {api} from './api'

const apiEndPoint = `${api}/login-user/applicant`;

export function applicantLogin(loginData) {

    return http.post(apiEndPoint, loginData)
    .then(function (response) {
        console.log(response.data.data);
        console.log("Headers", response.headers)
        toast.success(`${response.data.msg}`);
        return response.data
    })
    .catch(function (error) {
        if(error.response.data) {
            console.log(error.response.data);
            toast.error(error.response.msg);
            
        }
        if(error.response) {
            console.log(error.response);
            toast.error(error.response);
        }
        else {
            console.log(error);
            toast.error(error);
        }
        return {}
    });

}