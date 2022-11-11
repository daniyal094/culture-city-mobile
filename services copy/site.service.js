import axios from "@/config/axios-instance";
import { useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import useToaster from "@/composables/use-toaster";

const useSiteService = () => {


    //Submit Contact Us
    const useHandleContactUsService = () => {
        const handleContactUsRequest = (data) => {
            return axios.post(`/contact-us/`,data)
        }

        const onSuccess = () => {
            useToaster('success','Success','Form Successfully Submitted')
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
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

export default useSiteService;
