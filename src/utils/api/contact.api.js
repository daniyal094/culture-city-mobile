import axios from "../config/axios-instance";
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';
import {  useNavigation } from "@react-navigation/native";
import { routes } from '../constants/routes';
const useContactApi = () => {
const navigation = useNavigation()

    //Submit Contact Us
    const useHandleContactUsService = () => {
        const handleContactUsRequest = (data) => {
            return axios.post(`/contact-us/`,data)
        }

        const onSuccess = () => {
            Toast.show('Form Successfully Submitted')
            navigation.goBack()
        }
        const onError = (error) => {
            let err = error.response.data?.message;
            console.log(err, 'err');
            Toast.show(Array.isArray(err) ? err[0] : err);
        }

        return useMutation(
            (contactUsData) => handleContactUsRequest(contactUsData),
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }


    return {useHandleContactUsService}
};

export default useContactApi;
