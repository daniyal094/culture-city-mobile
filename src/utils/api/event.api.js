import {useMutation, useQuery} from '@tanstack/react-query';
import axiosInstance from '../config/axios-instance';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
export default useEventApi = () => {
  const navigation = useNavigation();

  const useHandleGetAllEventsApi = () => {
    const fetchAllEventsByType = () => {
      return axiosInstance.get(`/event-types/events`);
    };

    return useQuery(['event-list'], fetchAllEventsByType, {
      retry: 0,
      select: response => {
        return response?.data?.data;
      },
    });
  };

  // Search Event
  const useFetchGetSearchEventsApi = () => {
    const handleGetSearchEventsService = data => {
      return axiosInstance.get(
        `https://dev.cultureinyourcity.com/api/v1/event/browse?page=1&limit=99&culture=${data.culture}&eventType=${data.eventType}&isFree=${data.isFree}&category=1&dateFilter=${data.dateFilter}&date&searchQuery=${data.query}`,
      );
    };

    const onSuccess = response => {
      Toast.show(response.data?.message);
    };
    const onError = error => {
      let err = error.response.data?.message;
      console.log(err, 'err');
      Toast.show(Array.isArray(err) ? err[0] : err);
    };

    return useMutation(data => handleGetSearchEventsService(data), {
      onSuccess,
      onError,
    });
  };

  //Fetch Event Types
  const useFetchEventTypesService = () => {
    const fetchEventTypes = () => {
      const page = 1;
      const limit = 99;
      return axiosInstance.get(`/event-types/all?page=${page}&limit=${limit}`);
    };

    return useQuery(['event-types'], fetchEventTypes, {
      retry: 0,
      select: response => {
        return response?.data?.data.map(event => event.name);
      },
    });
  };

  //Fetch User Events
  const useFetchUserEventsService = userId => {
    const fetchUserEventsRequest = () => {
      const page = 1;
      const limit = 999;
      return axiosInstance.get(
        `/event/my?userId=${userId}&page=${page}&limit=${limit}`,
      );
    };

    return useQuery(['user-events', userId], fetchUserEventsRequest, {
      retry: 0,
      select: response => {
        return response?.data?.data;
      },
    });
  }; 

  //Fetch Event By Id
  const useFetchEventByIdService = eventId => {
    const fetchEventByIdRequest = id => {
      return axiosInstance.get(`/event/?eventId=${id}`);
    };
    const onError = error => {
      if (error.response.status === 400) {
        console.log(error);
      }
    };
    return useQuery(['event', eventId], () => fetchEventByIdRequest(eventId), {
      retry: 1,
      onError,
      select: response => {
        return response?.data?.data;
      },
      enabled: !!eventId,
    });
  };

  //Fetch User Bookmark Events
  const useFetchUserBookmarkEventsService = userId => {
    const fetchUserBookmarkEventsRequest = () => {
      const page = 1;
      const limit = 999;
      return axiosInstance.get(
        `/favourite?userId=${userId}&page=${page}&limit=${limit}`,
      );
    };
    const onError = error => {
      if (error.response.status === 400) {
        console.log(error);
      }
    };
    return useQuery(['user-bookmark', userId], fetchUserBookmarkEventsRequest, {
      retry: 0,
      onError,
      select: response => {
        return response?.data?.data;
      },
    });
  };

  // get user booking / tickets
  const useFetchUserBookingEventsService = userId => {
    const fetchUserBookingEventsRequest = () => {
      const page = 1;
      const limit = 999;
      return axiosInstance.get(
        `booking/?seekerId=${userId}&page=${page}&limit=${limit}`,
      );
    };
    const onError = error => {
      if (error.response.status === 400) {
        console.log(error);
      }
    };
    return useQuery(['user-booking', userId], fetchUserBookingEventsRequest, {
      retry: 0,
      onError,
      select: response => {
        return response?.data?.data;
      },
    });
  };

  // Home Events
  const useFetchHomeEventsService = userId => {
    const fetchHomeEventsRequest = () => {
      return axiosInstance.get(`/event/home-page`);
    };

    return useQuery(['home-event'], fetchHomeEventsRequest, {
      retry: 1,
      select: response => {
        return response?.data?.data;
      },
    });
  };

  // Near By Events
  const useFetchNearByEventsService = () => {
    const fetchNearByEventsRequest = () => {
      return axiosInstance.get(
        `event/near-by?longitude=67.08761615226645&latitude=24.92660346330506&page=1&limit=999`,
      );
    };

    return useQuery(['nearby-event'], fetchNearByEventsRequest, {
      retry: 1,
      select: response => {
        return response?.data?.data;
      },
    });
  };

  // Fetch favorite status of Events
  const useFetchFavStatusEventsService = () => {
    const fetchFavStatusEventsRequest = (seekerId, eventId) => {
      return axiosInstance.get(
        `/event/favourite-followed?seekerId=${seekerId}&eventId=${eventId}`,
      );
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
    return useMutation(
      (seekerId, eventId) => fetchFavStatusEventsRequest(seekerId, eventId),
      {
        onError,
      },
    );
  };

  //Add Event To Favourite
  const useHandleAddEventToFavouriteService = () => {
    const HandleAddEventToFavouriteRequest = (eventId, userId) => {
      return axios.post(`/favourite?userId=${userId}&eventId=${eventId}`);
    };

    const onError = error => {
      useToaster('danger', 'Error', error.response.data.message);
    };
    return useMutation(
      (eventId, userId) => HandleAddEventToFavouriteRequest(eventId, userId),
      {
        retry: 0,
        onError,
      },
    );
  };

  //Remove Event To Favourite
  const useHandleRemoveEventFromFavouriteService = () => {
    const handleRemoveEventFromFavouriteRequest = (eventId, userId) => {
      return axiosInstance.delete(
        `/favourite?userId=${userId}&eventId=${eventId}`,
      );
    };

    const onError = error => {
      console.log(error);
      Toast.show(error.response.data.message);
    };
    return useMutation(
      (eventId, userId) =>
        handleRemoveEventFromFavouriteRequest(eventId, userId),
      {
        retry: 0,
        onError,
        // onSuccess: data => data,
      },
    );
  };

  return {
    useHandleGetAllEventsApi,
    useFetchGetSearchEventsApi,
    useFetchEventTypesService,
    useFetchUserEventsService,
    useFetchEventByIdService,
    useFetchUserBookmarkEventsService,
    useFetchUserBookingEventsService,
    useFetchHomeEventsService,
    useFetchNearByEventsService,
    useHandleRemoveEventFromFavouriteService,
    useHandleAddEventToFavouriteService,
    useFetchFavStatusEventsService,
  };
};
