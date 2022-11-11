import axios from "@/config/axios-instance";
import TokenService from "./token.service";
import {QueryClient, useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import {useRouter} from "vue-router";
import useToaster from "@/composables/use-toaster";
import {ROLES} from "@/utils/constants";
import {ROUTES} from "@/utils/constants/routes";
import {ACCESS_TYPE} from "@/utils/constants/auth";

const useSettingsService = () => {
    const router = useRouter()
    const queryClient = new QueryClient()

    //Change Profile Picture
    const useHandleChangeProfilePictureService = () => {
        const userId = TokenService.getUser()?._id
        const handleChangeProfilePictureRequest = (data) => {
            return axios.put(`/profile-settings/profile-picture?userId=${userId}`,data)
        }

        const onSuccess = (response) => {
            useToaster("success","Success",response.data.message)
            TokenService.updateUser("profilePicture",response.data.data)
            router.push({name:ROUTES.ORGANIZATION,params:{organizerId:userId}})
            // console.log(queryClient)
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (profilePicture) => handleChangeProfilePictureRequest(profilePicture),
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }

    const useHandleChangeUserInformationService = () => {
        const userId = TokenService.getUser()?._id
        const handleChangeUserInformationRequest = (data) => {
            return axios.put(`/profile-settings/info?userId=${userId}`,data)
        }

        const onSuccess = (response) => {
            useToaster("success","Success",response.data.message)
            // console.log(queryClient)
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (data) => handleChangeUserInformationRequest(data),
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }

    const useHandleChangeUserPasswordService = () => {
        const userId = TokenService.getUser()?._id
        const handleChangeUserPasswordRequest = (data) => {
            return axios.put(`/profile-settings/password?userId=${userId}`,data)
        }

        const onSuccess = (response) => {
            useToaster("success","Success",response.data.message)
            // console.log(queryClient)
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (data) => handleChangeUserPasswordRequest(data),
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }

    //Is Following Organizer And Favourited Event
    const useFetchIsFollowingOrgAndFavEventService = (eventId,userId) => {
        const userRole = TokenService.getUser()?.roles
        const fetchIsFollowingOrgAndFavEvent = (eventId,userId) => {
            return axios.get(`/event/favourite-followed?seekerId=${userId.value}&eventId=${eventId.value}`)
        }
        return useQuery(
            ['is-following-or-favourite',eventId],
            ()=>fetchIsFollowingOrgAndFavEvent(eventId,userId),
            {
                retry:0,
                select:(response)=>response.data?.data,
                enabled:(userRole === ROLES.SEEKER)
            }
        )
    }

    //Follow Organizer
    const useHandleFollowOrganizerService = () => {
        const userId = TokenService.getUser()?._id
        const handleFollowOrganizerRequest = (id) => {
            return axios.post(`/follow?seekerId=${userId}&organizerId=${id}`)
        }

        const onSuccess = () => {
            // useToaster("success","Success",response.data.message)
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (organizerId)=>handleFollowOrganizerRequest(organizerId),
            {
                onError,
                onSuccess,
                retry:0
            }
        )
    }

    //Un Follow Organizer
    const useHandleUnFollowOrganizerService = () => {
        const userId = TokenService.getUser()?._id
        const handleUnFollowOrganizerRequest = (id) => {
            return axios.delete(`/follow?seekerId=${userId}&organizerId=${id}`)
        }

        const onSuccess = () => {
            // useToaster("success","Success",response.data.message)
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (organizerId)=>handleUnFollowOrganizerRequest(organizerId),
            {
                onError,
                onSuccess,
                retry:0
            }
        )
    }

    //Get Followers
    const useFetchFollowersService = (followType) => {
        const userId = TokenService.getUser()?._id
        const handleFetchFollowersRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/follow?userId=${userId}&page=${page}&limit=${limit}&followType=${followType}`)
        }

        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useQuery(
            ['followers',userId],
            handleFetchFollowersRequest,
            {
                onError,
                retry:0
            }
        )
    }

    //Save Card
    const useHandleSaveCreditCardService = () => {
        const userId = TokenService.getUser()?._id
        const handleSaveCreditCardRequest = () => {
            return axios.post(`/profile-settings/card?userId=${userId}`)
        }

        const onSuccess = (response) => {
            window.location.href = response?.data?.data
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            () => handleSaveCreditCardRequest(),
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }

    //Save Payout
    const useHandleSavePayoutService = () => {
        const userId = TokenService.getUser()?._id
        const handleSavePayoutRequest = () => {
            return axios.put(`/profile-settings/payout?userId=${userId}`)
        }

        const onSuccess = (response) => {
            window.location.href = response?.data?.data
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            handleSavePayoutRequest,
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }

    //Visit Stripe Dashboard
    const useHandleVisitStripeDashboardService = () => {
        const userId = TokenService.getUser()?._id
        const handleVisitStripeDashboardRequest = () => {
            return axios.get(`profile-settings/payout/dashboard?userId=${userId}`)
        }

        const onSuccess = (response) => {
            window.location.href = response?.data?.data
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            handleVisitStripeDashboardRequest,
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }

    //Delete Card
    const useHandleDeleteCreditCardService = () => {
        const userId = TokenService.getUser()?._id
        const queryClient = useQueryClient()
        const handleDeleteCreditCardRequest = () => {
            return axios.delete(`/profile-settings/card?userId=${userId}`)
        }

        const onSuccess = () => {
            useToaster("success","Success","Card Deleted")
            queryClient.setQueryData(['card-data',userId], (oldQueryData)=>{
                return{
                    ...oldQueryData,
                    data : {
                        data : null
                    }
                }
            })
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            () => handleDeleteCreditCardRequest(),
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }


    //Get Card Details
    const useFetchCreditCardService = () => {
        const userId = TokenService.getUser()?._id
        const FetchCreditCardRequest = () => {
            return axios.get(`/profile-settings/card?userId=${userId}`)
        }

        return useQuery(
            ['card-data',userId],
            FetchCreditCardRequest,
            {
                retry:0,
            }
        )

    }

    return {useHandleChangeProfilePictureService,useHandleChangeUserInformationService,
        useHandleChangeUserPasswordService,useHandleFollowOrganizerService,useFetchFollowersService,
        useFetchCreditCardService,useHandleDeleteCreditCardService,useHandleSaveCreditCardService
    ,useHandleSavePayoutService,useHandleVisitStripeDashboardService,useFetchIsFollowingOrgAndFavEventService,useHandleUnFollowOrganizerService}
};

export default useSettingsService;
