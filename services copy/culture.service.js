import axios from "@/config/axios-instance";
import TokenService from "./token.service";
import { useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import {useRoute, useRouter} from "vue-router";
import useToaster from "@/composables/use-toaster";
import {ROUTES} from "@/utils/constants/routes";

const useCultureService = () => {
    const router = useRouter()
    const queryClient = new useQueryClient()

    //Get All Cultures
    const useFetchAllCulturesService = () => {
        const FetchAllCulturesRequest = () => {
            return axios.get(`/culture/all?page=1&limit=9999`)
        }
        return useQuery(
            ['all-cultures'],
            FetchAllCulturesRequest,
            {
                retry:1,
                select:(response)=>{
                    return{
                        data:{
                            ...response.data,
                            data:response.data?.data?.map((cultures)=>cultures?.cultures).reduce(function(result, currentObject) {
                                result.push(...currentObject.map((culture)=>{
                                    return{
                                        culture
                                    }
                                }))
                                return result;
                            }, []),
                        }
                    }
                }
            }
        )
    }

    //Get All Culture Groups
    const useFetchAllCultureGroupsService = () => {
        const FetchAllCultureGroupsRequest = () => {
            return axios.get(`/culture/group?page=1&limit=999`)
        }
        return useQuery(
            ['all-culture-groups'],
            FetchAllCultureGroupsRequest,
            {
                retry:1,
            }
        )

    }


    return {useFetchAllCulturesService,useFetchAllCultureGroupsService}
};

export default useCultureService;
