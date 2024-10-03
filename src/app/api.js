import axios from "axios";


export const USER_KEY = "user"
const LOGIN_PATH = "/dj-rest-auth/login";
const RESET_TOKEN_PATH = "/dj-rest-auth/token/refresh";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
  });


client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest.url !== `${RESET_TOKEN_PATH}/`) {
            try {
                await refreshToken();
                // try to get origin request
                return client(originalRequest);
            } catch (err) {
                // move to login
                localStorage.removeItem(USER_KEY);
                window.location.href = '/login';
            }
            }
        return Promise.reject(error);
    }
);

    export async function login(data) {
    const url = `${LOGIN_PATH}/`;
    const response = await client.post(url, data);
    return response.data;
  }

  export async function refreshToken() {
    const url = `${RESET_TOKEN_PATH}/`;
    const response = await client.post(url);
    const newAccessToken = response.data.access; 
    
    return newAccessToken;
  }
