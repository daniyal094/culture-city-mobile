import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../config/axios-instance';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default useUserApi = () => {
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
        navigation.navigate(routes.auth);
        Toast.show('Session Expired');
      } else {
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

  //Save Card
  const useHandleSaveCreditCardService = userId => {
    const handleSaveCreditCardRequest = () => {
      return axiosInstance.post(`/profile-settings/card?userId=${userId}`);
    };

    const onSuccess = response => {
      navigation.navigate(routes.paymentWeb, {
        link: response?.data?.data,
        heading: 'Save Card Details',
      });
    };
    const onError = error => {
      Toast.show(error.response.data.message);
    };

    return useMutation(() => handleSaveCreditCardRequest(), {
      onError,
      onSuccess,
      retry: 0,
    });
  };

  //Delete Card
  const useHandleDeleteCreditCardService = userId => {
    const queryClient = useQueryClient();
    const handleDeleteCreditCardRequest = () => {
      return axiosInstance.delete(`/profile-settings/card?userId=${userId}`);
    };

    const onSuccess = () => {
      Toast.show('Card Deleted Successfully');
      queryClient.setQueryData(['card-data', userId], oldQueryData => {
        return {
          ...oldQueryData,
          data: {
            data: null,
          },
        };
      });
    };
    const onError = error => {
      useToaster('danger', 'Error', viewError(error.response.data.message));
    };

    return useMutation(() => handleDeleteCreditCardRequest(), {
      onError,
      onSuccess,
      retry: 0,
    });
  };

  //Get Card Details
  const useFetchCreditCardService = userId => {
    const FetchCreditCardRequest = () => {
      return axiosInstance.get(`/profile-settings/card?userId=${userId}`);
    };

    return useQuery(['card-data', userId], FetchCreditCardRequest, {
      retry: 0,
      select: response => {
        return response?.data?.data;
      },
    });
  };

  //Save Payout
  const useHandleSavePayoutService = userId => {
    const handleSavePayoutRequest = () => {
      return axiosInstance.put(`/profile-settings/payout?userId=${userId}`);
    };

    const onSuccess = response => {
      navigation.navigate(routes.paymentWeb, {
        link: response?.data?.data,
        heading: 'Save Card Details',
      });
    };
    const onError = error => {
      Toast.show(error.response.data.message);
    };

    return useMutation(handleSavePayoutRequest, {
      onError,
      onSuccess,
      retry: 0,
    });
  };

  //Visit Stripe Dashboard
  const useHandleVisitStripeDashboardService = userId => {
    const handleVisitStripeDashboardRequest = () => {
      return axiosInstance.get(
        `profile-settings/payout/dashboard?userId=${userId}`,
      );
    };

    const onSuccess = response => {
      navigation.navigate(routes.paymentWeb, {
        link: response?.data?.data,
        heading: 'Stripe Dashboard',
      });
    };
    const onError = error => {
      Toast.show(error.response.data.message);
    };

    return useMutation(handleVisitStripeDashboardRequest, {
      onError,
      onSuccess,
      retry: 0,
    });
  };

  // Get Comision
  const useFetchComisionService = (seekerId, eventId) => {
    const fetchComisionRequest = () => {
      return axiosInstance.get(`commission/all?page=1&limit=999`);
    };

    return useQuery(['comision'], fetchComisionRequest, {
      retry: 1,
      select: response => {
        return response?.data?.data;
      },
    });
  };

  //Is Following Organizer
  const useFetchIsFollowingOrgAndFavEventService = (
    userId,
    eventId,
    enabled,
  ) => {
    const fetchIsFollowingOrgAndFavEvent = () => {
      return axiosInstance.get(
        `/event/favourite-followed?seekerId=${userId}&eventId=${eventId}`,
      );
    };
    return useQuery(
      ['is-following-or-favourite', eventId],
      () => fetchIsFollowingOrgAndFavEvent(),
      {
        retry: 0,
        select: response => response.data?.data,
        enabled: enabled,
      },
    );
  };

  //Follow Organizer
  const useHandleFollowOrganizerService = (userId, organizerId) => {
    const handleFollowOrganizerRequest = () => {
      return axiosInstance.post(
        `/follow?seekerId=${userId}&organizerId=${organizerId}`,
      );
    };

    const onSuccess = () => {
      Toast.show('Followed Organizer');
      // useToaster("success","Success",response.data.message)
    };
    const onError = error => {
      Toast.show(error.response.data.message);
    };

    return useMutation(handleFollowOrganizerRequest, {
      onError,
      onSuccess,
      retry: 0,
    });
  };

  //Un Follow Organizer
  const useHandleUnFollowOrganizerService = (userId, organizerId) => {
    const handleUnFollowOrganizerRequest = () => {
      return axiosInstance.delete(
        `/follow?seekerId=${userId}&organizerId=${organizerId}`,
      );
    };

    const onSuccess = () => {
      Toast.show('Unfollowed Organizer');
    };
    const onError = error => {
      Toast.show(error.response.data.message);
    };

    return useMutation(handleUnFollowOrganizerRequest, {
      onError,
      onSuccess,
      retry: 0,
    });
  };

  return {
    useHandleGetUserByIdApi,
    useChangeUserInforService,
    useHandleSaveCreditCardService,
    useFetchCreditCardService,
    useHandleDeleteCreditCardService,
    useFetchComisionService,
    useHandleSavePayoutService,
    useHandleVisitStripeDashboardService,
    useFetchIsFollowingOrgAndFavEventService,
    useHandleFollowOrganizerService,
    useHandleUnFollowOrganizerService,
  };
};
