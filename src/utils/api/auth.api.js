import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../config/axios-instance"
import Toast from 'react-native-simple-toast';

export default useAuthApi = () => {

    const useHandleLoginApi = () => {
        const handleLoginService = (data) =>{
            return axiosInstance.post(`/auth/login`,data)
        }

        const onSuccess = (response) => {
            console.log(response.data?.data)
            Toast.show(response.data?.message);
        }
        const onError = (error) => {
            let err = error.response.data?.message
            console.log(err,"err")
            Toast.show(Array.isArray(err) ? err[0] : err);
        }

        return useMutation(
            (loginData)=>handleLoginService(loginData),
            {
                onSuccess,
                onError
            }
        )
    }

    return {useHandleLoginApi}
}
