import {useMutation, useQuery} from '@tanstack/react-query';
import axiosInstance from '../config/axios-instance';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../constants/routes';
export default useEventApi = () => {
  const navigation = useNavigation();
  const useHandleGetUserByIdApi = () => {
    const handleGetUserByIdService = id => {
      return axiosInstance.get(`/user/?userId=${id}`);
    };

    const onSuccess = response => {
      //   Toast.show(response.data?.message);
    };
    const onError = error => {
      let err = error.response.data?.message;
      console.log(err, 'err');
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(id => handleGetUserByIdService(id), {
      onSuccess,
      onError,
    });
  };

  //Update Profile Info
  const useChangeUserInforService = () => {
    const handleChangeUserInformationRequest = data => {
      return axiosInstance.put(
        `/profile-settings/info?userId=${data.id}`,
        data,
      );
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
    };
    const onError = error => {
      if (error?.request.status === 401) {
        AsyncStorage.clear();
        Toast.show('Session Expired 401');
        navigation.navigate(routes.auth);
      }
      else{
      console.log(error);
        Toast.show(error.data?.message);
      }
    };

    return useMutation(data => handleChangeUserInformationRequest(data), {
      onError,
      onSuccess,
      retry: 0,
    });
  };

  return {
    useHandleGetUserByIdApi,
    useChangeUserInforService,
  };
};
