import axios from "../services/http";
import {ADD_USERS, DELETE_USERS, DETAILED_USERS, GET_STATISTICS, GET_USERS_LIST, UPDATA_USERS} from "../config/url";

const model={
    getUsersList(obj){
        return axios.get(GET_USERS_LIST,{
            params:obj,
        });
    },
    getStatistics(){
        return axios.get(GET_STATISTICS);
    },
    adduser(obj){
        return axios.post(ADD_USERS,obj);
    },
    deleteUser(id){
        return axios.delete(DELETE_USERS+"/"+id);
    },
    detailedUser(id){
        return axios.get(DETAILED_USERS+"/"+id);
    },
    updataUser(obj){
        return axios.put(UPDATA_USERS,obj);
    },

}
export default model;