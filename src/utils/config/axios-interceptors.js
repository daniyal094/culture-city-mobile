import TokenService from "../services/token.service";
import Cookies from "js-cookie";
import {cookieAuth} from "../utils/constants/cookies";
import axios from "./axios-instance";
import {PUBLIC_ENDPOINTS} from "../utils/constants";
import {toast} from "react-toastify";

// intercepting requests
// Step-2: Create request, response & error handlers
const requestHandler = request => {
    // Token will be dynamic, so we can use any app-specific way to always
    // fetch the new token before making the call
    const token = TokenService.getLocalAccessToken();
    const refreshToken = TokenService.getLocalRefreshToken()
    const userId = TokenService.getUser()?._id
    // console.log(request,"request")
    if(token && request.url !== `/user-auth/refresh-tokens?userId=${userId}`){
        request.headers['x-access-token'] = Cookies.get(cookieAuth);
    }
    else{
        request.headers['x-refresh-token'] =  refreshToken;
    }
    // console.log("me here 1")
    return request;
};

const responseHandler = response => {
    response.headers['x-refresh-token'] = Cookies.get(cookieAuth);
    return response;
};


const errorHandler = async (err) => {
    const originalConfig = err.config;
    const retries = TokenService.getTokenRetries()
    // console.log(originalConfig,"originalConfig")

    if (!PUBLIC_ENDPOINTS.includes(originalConfig.url.split("?")[0] ? originalConfig.url.split("?")[0] : originalConfig.url) && err.response) {
        //!originalConfig._retry ||

        if(retries > 0 && retries){
            const userId = TokenService.getUser()?._id
            // Access Token was expired
            if (err.response.status === 401) {

                // console.log(originalConfig,"originalConfig2")
                if(originalConfig.url === `/user-auth/refresh-tokens?userId=${userId}`){
                    TokenService.setTokenRetries(retries-1)
                }
                originalConfig._retry = true;
                try {
                    const rs = await axios.get(`/user-auth/refresh-tokens?userId=${userId}`)

                    const { accessToken,refreshToken } = rs.data.data.tokens;
                    TokenService.saveLocalRefreshToken(refreshToken)
                    TokenService.saveLocalAccessToken(accessToken);
                    TokenService.setTokenRetries(5)
                    return axios(originalConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
            else if(err.response.status === 403){

                window.location.href = "/login"
            }
        }else{
            toast.info("Your session has expired.")
            TokenService.clearStorage()
            //Call for new refresh token
            window.location.href = "/login"
        }
    }
    return Promise.reject(err);
};

const setup = () => {
    axios.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
    );
}



export default setup;