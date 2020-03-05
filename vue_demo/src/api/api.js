import axios from 'axios';

let base = "http://localhost:8080";

//登录
export const requestLogin = params => { return axios.post(`${base}/user/login`,params).then(res => res.data); };
//注册
export const requestRegister = params => { return axios.post(`${base}/user/register`,params,).then(res => res.data); };
//用户是否存在
export const isExistsByUsername = params => { return axios.post(`${base}/user/isExistsByUsername`,params,).then(res => res.data); };
//邮箱是否存在
export const isExistsEmail = params => { return axios.post(`${base}/user/isExistsEmail`,params,).then(res => res.data); };
//电话是否存在
export const isExistsPhone = params => { return axios.post(`${base}/user/isExistsPhone`,params,).then(res => res.data); };
//退出登录
export const loginOut = params => { return axios.post(`${base}/user/isExistsPhone`,).then(res => res.data); };


