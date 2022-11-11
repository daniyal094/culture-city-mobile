import {cookieAuth, cookieData, cookieRefresh} from "@/utils/constants/cookies";
import Cookies from "js-cookie";
import {TOKEN_RETRIES} from "@/utils/constants/tokens";

class TokenService {
    getLocalAccessToken = () => {
        return Cookies.get(cookieAuth)
    }
    saveLocalAccessToken = (token) => {
        Cookies.set(cookieAuth,token)
    }
    getLocalRefreshToken = () => {
        return Cookies.get(cookieRefresh)
    }
    saveLocalRefreshToken = (token) => {
        Cookies.set(cookieRefresh,token)
    }
    getUser = () => {
        try {
            return JSON.parse(localStorage.getItem(cookieData));
        } catch{
            return {}
        }
    }
    setUser = (user) => {
        localStorage.setItem(cookieData, JSON.stringify(user));
    }
    updateUser = (key, value) => {
        const userObject = this.getUser();
        userObject[key] = value;
        this.setUser(userObject);
    }
    setTokenRetries = (retries) => {
        localStorage.setItem(TOKEN_RETRIES,retries)
    }
    getTokenRetries = () => {
        return localStorage.getItem(TOKEN_RETRIES)
    }
    clearStorage = () => {
        localStorage.clear();
        Cookies.remove(cookieAuth)
        Cookies.remove(cookieData)
    }
}
export default new TokenService();
