// Set config defaults when creating the instance
import axios from "axios";
import { Mutex } from "async-mutex";
const mutex = new Mutex();
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  timeout: 1000,
  withCredentials:true
});
 const handleRefreshToken = async () => {
        return await mutex.runExclusive(async () => {
            const res = await instance.get('/api/v1/auth/refresh');
            if (res && res.data) return res.data.access_token;
            else return null;
        });
    }
// Add a request interceptor
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("access_token");
        const auth = token ? `Bearer ${token}` : '';
        config.headers["Authorization"] = auth;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        if (response && response.data) return response.data;
        return response;
    }, async function (error) {
        if (error?.response?.status === 401 && error.config) {
            const newAccessToken = await handleRefreshToken();
            if (newAccessToken) {
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                localStorage.setItem('access_token', newAccessToken);
                return instance.request(error.config);
            }


        }
        if (error && error.response && error.response.data) {
            return error.response.data;
        }
        return Promise.reject(error);
    });
export default instance