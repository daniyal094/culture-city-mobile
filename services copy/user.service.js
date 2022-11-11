import axios from "@/config/axios-instance";
import TokenService from "./token.service";
import { useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import {useRoute, useRouter} from "vue-router";
import useToaster from "@/composables/use-toaster";
import {ROUTES} from "@/utils/constants/routes";

const useUserService = () => {
    const router = useRouter()
    const queryClient = new useQueryClient()


    //Fetch User Data
    const useFetchUserService = (userId,isEnabled) => {
        const fetchUserRequest = (id) => {
            return axios.get(`/user/?userId=${id.value}`)
        }

        return useQuery(
            ['user',userId],
            ()=>fetchUserRequest(userId),
            {
                retry:1,
                enabled: isEnabled,
                select: (response) => response.data?.data
            }
        )

    }


    return {useFetchUserService}
};

export default useUserService;
