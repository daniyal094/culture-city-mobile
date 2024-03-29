import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../config/axios-instance';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../constants/routes';
import {setAsyncStorage} from '../helper/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import { useUserUpdate } from '../context/UserContenxt';
export default useAuthApi = () => {
  const navigation = useNavigation();
  const updateUser = useUserUpdate()

  const useHandleLoginApi = () => {
    const handleLoginService = data => {
      return axiosInstance.post(`/auth/login`, data);
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
      setAsyncStorage('user', response?.data?.data);
      setAsyncStorage('tokens', response?.data?.data?.tokens);
      updateUser({
        user : response?.data?.data?.user,
        token : response?.data?.data?.tokens,
        role : response?.data?.data?.user?.role
      })
      if (response?.data?.data?.user?.isApproved) {
        navigation.navigate(routes.app);
      } else {
        navigation.navigate(routes.verification);
      }
    };
    const onError = error => {
      let err = error?.response?.data?.message;
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(loginData => handleLoginService(loginData), {
      onSuccess,
      onError,
    });
  };

  const useHandleSignUpApi = () => {
    const handleSignUpService = data => {
      return axiosInstance.post(`/auth/signup`, data);
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
      navigation.navigate(routes.signin);
    };
    const onError = error => {
      let err = error.response.data?.message;
      console.log(err, 'err');
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(loginData => handleSignUpService(loginData), {
      onSuccess,
      onError,
    });
  };

  const useHandleForgotPasswordApi = () => {
    const handleForgotPasswordService = data => {
      return axiosInstance.post(`/auth/forgot-password`, data);
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
    };
    const onError = error => {
      let err = error.response.data?.message;
      console.log(err, 'err');
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(loginData => handleForgotPasswordService(loginData), {
      onSuccess,
      onError,
    });
  };

  const useHandleForgotNewPasswordApi = () => {
    const handleForgotNewPasswordService = data => {
      return axiosInstance.post(`/auth/forgot-password/change-password`, data);
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
      navigation.navigate(routes.signin);
    };
    const onError = error => {
      let err = error.response.data?.message;
      console.log(err, 'err');
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(loginData => handleForgotNewPasswordService(loginData), {
      onSuccess,
      onError,
    });
  };

  const useHandleResendVerificationCodeApi = () => {
    const handleResendVerificationCodeService = id => {
      return axiosInstance.get(`/auth/resend-verification-code?userId=${id}`);
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
    };
    const onError = error => {
      let err = error.response.data?.message;
      console.log(err, 'err');
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(id => handleResendVerificationCodeService(id), {
      onSuccess,
      onError,
    });
  };

  const useHandleLogOutApi = () => {
    const handleLogoutService = id => {
      return axiosInstance.post(`/auth/logout?userId=${id}`);
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
      AsyncStorage.clear();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: routes.auth}],
        }),
      );
      updateUser({
        user : '',
        token : '',
        role : ''
      })
      // navigation.navigate(routes.auth);
    };
    const onError = error => {
      if (error?.request.status === 401) {
        Toast.show('logout Successfull');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: routes.auth}],
          }),
        );
        // navigation.navigate(routes.auth);
      } else {
        let err = error.response.data?.message;
        Toast.show(Array.isArray(err) ? err[0] : err);
      }
    };

    return useMutation(id => handleLogoutService(id), {
      onSuccess,
      onError,
    });
  };

  const useHandleEmailVerificationApi = () => {
    const handleEmailVerificationService = data => {
      return axiosInstance.post(
        `/auth/email-verification?userId=${data.id}`,
        data,
      );
    };

    const onSuccess = response => {
      Toast.show('success full verification Please login again');
      navigation.navigate(routes.signin);
      AsyncStorage.clear();
    };
    const onError = error => {
      let err = error.response.data?.message;
      console.log(err, 'err');
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(data => handleEmailVerificationService(data), {
      onSuccess,
      onError,
    });
  };

  const useHandleChangePasswordApi = () => {
    const handleChangePasswordService = data => {
      return axiosInstance.put(
        `/profile-settings/password?userId=${data.id}`,
        data,
      );
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
      navigation.navigate(routes.changePassSuccess);
    };
    const onError = error => {
      let err = error.response.data?.message;
      console.log(err, 'err');
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(data => handleChangePasswordService(data), {
      onSuccess,
      onError,
    });
  };

  return {
    useHandleLoginApi,
    useHandleSignUpApi,
    useHandleForgotPasswordApi,
    useHandleForgotNewPasswordApi,
    useHandleResendVerificationCodeApi,
    useHandleLogOutApi,
    useHandleEmailVerificationApi,
    useHandleChangePasswordApi,
  };
};
