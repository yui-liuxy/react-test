//配置网络请求
let baseUrl="https://reactapi.iynn.cn";

//地址的定义
export const NORMAL_LOGIN=baseUrl+"/api/common/auth/login";
export const MOBILE_LOGIN=baseUrl+"/api/common/auth/mobile";
export const VERIFY_CAPTCHA=baseUrl+"/api/common/captcha/verify";
export const GET_SMS_CODE=baseUrl+"/api/common/sms/send";
export const JWT_PRE_CHECK=baseUrl+"/api/common/auth/jwtPreCheck";
export const ADMIN_INFO=baseUrl+"/api/common/auth/adminInfo";
export const GET_USERS_LIST=baseUrl+"/api/users";
export const GET_STATISTICS=baseUrl+"/api/users/statistics/getData";
export const ADD_USERS=baseUrl+"/api/users/add";
export const DELETE_USERS=baseUrl+"/api/users";
export const DETAILED_USERS=baseUrl+"/api/users";
export const UPDATA_USERS=baseUrl+"/api/users";