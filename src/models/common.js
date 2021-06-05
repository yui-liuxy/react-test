import axios from "../services/http";
import {
    NORMAL_LOGIN,
    MOBILE_LOGIN,
    VERIFY_CAPTCHA,
    GET_SMS_CODE,
    JWT_PRE_CHECK,
    ADMIN_INFO,
    GET_USERS_LIST
} from "../config/url";

const model={
    normalLogin(obj){
       return   axios.post(NORMAL_LOGIN,obj);
    },
    verifyCpt(obj){
        return   axios.post(VERIFY_CAPTCHA,obj);
    },
    getCode(obj){
        return   axios.post(GET_SMS_CODE,obj);
    },
    mobileLogin(obj){
        return axios.post(MOBILE_LOGIN,obj);
    },
    checkJWT(){
        return axios.get(JWT_PRE_CHECK);
    },
    getAdminInfo(){
        return axios.get(ADMIN_INFO);
    },
    getUsersList(){
        return axios.get(GET_USERS_LIST);
    },
}
export default model