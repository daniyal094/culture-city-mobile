import axios from "@/config/axios-instance";
import TokenService from "./token.service";
import {useMutation, useQuery} from "vue-query";
import {viewError} from "@/utils/helpers";
import {useRouter} from "vue-router";
import useToaster from "@/composables/use-toaster";
import {ROLES} from "@/utils/constants";
import {ROUTES} from "@/utils/constants/routes";
import {ACCESS_TYPE} from "@/utils/constants/auth";

const useAuthService = () => {
    const router = useRouter()

    //User Log In
    const useHandleLoginInService = (emit) => {
        const handleLogInRequest = (data) => {
            return axios.post(`/auth/login`,data)
        }

        const onSuccess = (response) => {
            //If the user is an organizer, and they have not filled their details
            if(response.data?.data?.user?.role === ROLES.ORGANIZER && !response.data?.data?.user?.organization){
                emit('open-organization-details',{userId:response.data?.data?.user?._id})
            }
            else{
                //If the user is approved
                if(response.data?.data?.user?.isApproved){
                    TokenService.setUser(response.data.data?.user)
                    TokenService.saveLocalRefreshToken(response.data.data?.tokens?.refresh_token)
                    TokenService.saveLocalAccessToken(response.data.data?.tokens?.access_token)
                    TokenService.setTokenRetries(5)
                    if(response.data.data.user?.role === ROLES.ORGANIZER){
                        router.push({name:ROUTES.ORGANIZATION,params:{organizerId : response.data.data?.user?._id}})
                    }else if(response.data.data.user?.role === ROLES.SEEKER){
                        router.push({name:ROUTES.PROFILE,params:{seekerId : response.data.data?.user?._id}})
                    }
                    emit('close-modal')
                }
                //If the user is not approved
                else{
                    if(response.data.data?.user?.accessType === ACCESS_TYPE.INTERNAL){
                        emit('open-email-verification',{userId:response.data?.data?.user?._id})
                    }
                }
            }
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (loginInData) => handleLogInRequest(loginInData),
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }

    //User Log Out
    const useHandleLogOutService = () => {
        const onSuccess = (response) => {
            TokenService.clearStorage()
            router.push({name:ROUTES.HOME})
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        const handleLogoutRequest = (userId) => {
            return axios.post(`/auth/logout?userId=${userId}`)
        }

        return useMutation(
            (userId)=>handleLogoutRequest(userId),
            {
                onError,
                onSuccess,
                retry:0
            }
        )
    }

    //Forgot Password
    const useHandleForgotPasswordService = () => {

        const onSuccess = (response) =>{
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        const handleForgotPasswordRequest = (data) => {
            return axios.post(`/auth/forgot-password`,data)
        }

        return useMutation(
            (forgotPasswordData) => handleForgotPasswordRequest(forgotPasswordData),
            {
                onError,
                onSuccess,
                retry:0
            }
        )

    }

    //Change Password
    const useHandleChangePasswordService = (emit) => {

        const onSuccess = (response) => {
            emit('close-modal')
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        const handleChangePasswordRequest = (data) => {
            return axios.post(`/auth/forgot-password/change-password`,data)
        }

        return useMutation(
            (changePasswordData) => handleChangePasswordRequest(changePasswordData),
            {
                onError,
                onSuccess,
                retry:0,
            }
        )
    }

    //Organization Details
    const useHandleOrganizationDetailsService = (emit,userId) => {

        const onSuccess = () => {
            emit('open-login')
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        const handleOrganizationDetailsRequest = (data) => {
            return axios.patch(`/auth/organization?userId=${userId.value}`,data)
        }

        return useMutation(
            (organizationDetails) => handleOrganizationDetailsRequest(organizationDetails),
            {
                onError,
                onSuccess,
                retry:0,
            }
        )
    }

    //User Email Verification
    const useHandleEmailVerificationService = (emit,userId) => {

        const onSuccess = () => {
            emit('open-login')
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        const handleEmailVerificationRequest = (data) => {
            return axios.post(`/auth/email-verification?userId=${userId.value}`,data)
        }

        return useMutation(
            (emailData) => handleEmailVerificationRequest(emailData),
            {
                onError,
                onSuccess,
                retry:0
            }
        )
    }

    // User Sign Up
    const useHandleSignupService = (emit) => {

        const onSuccess = (response) => {
            useToaster("success","Success",response.data.message)
            if(response.data?.data?.user?.accessType === ACCESS_TYPE.INTERNAL){
                emit('open-email-verification',{userId:response.data?.data?.user?._id})
            }else{
                if(response.data?.data?.user?.role === ROLES.ORGANIZER){
                    emit('open-organization-details',{userId:response.data?.data?.user?._id})
                }
                else{
                    emit('open-login')
                }
            }
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        const handleSignupRequest = (data) => {
            return axios.post(`/auth/signup`,data)
        }

        return useMutation(
            (signUpData) => handleSignupRequest(signUpData),
            {
                onError,
                onSuccess,
                retry:0,
            }
        )

    }


    return {useHandleLoginInService,useHandleSignupService,useHandleEmailVerificationService,
        useHandleForgotPasswordService, useHandleChangePasswordService,useHandleOrganizationDetailsService,
        useHandleLogOutService}
};

export default useAuthService;
