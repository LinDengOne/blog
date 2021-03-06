import axios from 'axios'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
    timeout: 120000,
})

http.defaults.withCredentials=true;

// request 拦截器
http.interceptors.request.use(
    config => {
        // 设置token
        const token = localStorage.getItem('Authorization');
        //console.log(token);
        config.headers.Authorization = `Bearer ${token}`;
        // config.headers['Cache-Control'] = 'max-age=60';

        return config;
    }, 
    err => {
        return Promise.reject(err);
    }
)

// response 拦截器
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.status == 401) {
                // 清除token信息并跳转到登录页面
                localStorage.removeItem('Authorization');
                router.replace({path: 'login'})
            }
        }
        // return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
)

export default http