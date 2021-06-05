import axios from "axios";
//请求拦截器
axios.interceptors.request.use((cfg)=>{
    let jwt=localStorage.getItem("jwt");
    if (jwt){
        //将jwt放入请求头
        cfg.headers.Authorization=jwt;
    }
    return cfg;
})
//响应拦截器
axios.interceptors.response.use((ret)=>{
    if(ret.data.context && ret.data.context.jwt){
        localStorage.setItem('jwt', ret.data.context.jwt)
    }
    return ret;
})

export default  axios;