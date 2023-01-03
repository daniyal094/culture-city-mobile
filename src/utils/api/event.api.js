import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../config/axios-instance';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../constants/routes';
export default useEventApi = () => {
  const navigation = useNavigation();
  const queryClient = new useQueryClient();
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
  const useFetchUserBookmarkEventsService = (userId, enabled) => {
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
      enabled: enabled,
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

  // Reamingin Ticket Events
  const useFetchRemainingTickesService = eventId => {
    const fetchRemainingTickesRequest = () => {
      return axiosInstance.get(`event/remaining-tickets?eventId=${eventId}`);
    };

    return useQuery(['RemainingTickes'], fetchRemainingTickesRequest, {
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
  const useFetchFavStatusEventsService = (seekerId, eventId, enabled) => {
    const fetchFavStatusEventsRequest = () => {
      return axiosInstance.get(
        `/event/favourite-followed?seekerId=${seekerId}&eventId=${eventId}`,
      );
    };

    return useQuery(['fav-event'], fetchFavStatusEventsRequest, {
      retry: 1,
      select: response => {
        return response?.data?.data;
      },
      enabled: enabled,
    });
  };

  //Add Event To Favourite
  const useHandleAddEventToFavouriteService = (eventId, userId) => {
    const HandleAddEventToFavouriteRequest = () => {
      console.log(eventId, userId);
      return axiosInstance.post(
        `/favourite?userId=${userId}&eventId=${eventId}`,
      );
    };
    const onSuccess = response => {
      Toast.show('Event Added In Favourite List');
    };

    const onError = error => {
      Toast.show(error.response.data.message);
    };
    return useMutation(() => HandleAddEventToFavouriteRequest(), {
      onSuccess,
      onError,
    });
  };

  //Remove Event To Favourite
  const useHandleRemoveEventFromFavouriteService = (eventId, userId) => {
    const handleRemoveEventFromFavouriteRequest = () => {
      return axiosInstance.delete(
        `/favourite?userId=${userId}&eventId=${eventId}`,
      );
    };

    const onError = error => {
      console.log(error);
      Toast.show(error.response.data.message);
    };
    return useMutation(() => handleRemoveEventFromFavouriteRequest(), {
      onError,
      onSuccess: data => {
        Toast.show('Event Removed From Favourite List');
      },
    });
  };

  //Purchase Event
  const useHandlePurchaseEventService = (userId, organizerId) => {
    const HandlePurchaseEventRequest = tickets => {
      return axiosInstance.post(
        `/booking/?userId=${userId}&organizerId=${organizerId}`,
        tickets,
      );
    };

    const onSuccess = response => {
      if (typeof response?.data?.data === 'string') {
        navigation.navigate(routes.paymentWeb, {
          link: response.data.data,
          heading: 'Purchase Event',
        });
      } else {
        console.log('response?.data?.data', response?.data?.data);
        // router.push({name:ROUTES.TICKETS})
      }
    };

    const onError = error => {
      Toast.show(error.response.data.message);
    };
    return useMutation(tickets => HandlePurchaseEventRequest(tickets), {
      retry: 0,
      onSuccess,
      onError,
    });
  };

  //Fetch Organizer Ticket Orders
  const useFetchOrganizerTicketOrdersService = userId => {
    const fetchOrganizerTicketOrdersRequest = () => {
      const page = 1;
      const limit = 999;
      return axiosInstance.get(
        `/booking/orders?organizerId=${userId}&page=${page}&limit=${limit}`,
      );
    };

    return useQuery(
      ['ticket-orders', userId],
      fetchOrganizerTicketOrdersRequest,
      {
        retry: 1,
        select: response => {
          return response?.data?.data;
        },
      },
    );
  };

  //Fetch Organizer's Current/Past Events
  const useFetchOrganizerCurrentPastEventsService = isCurrentEvent => {
    const route = useRoute();
    const organizerId = route?.params?.organizerId;

    const fetchFavouriteEventsRequest = isCurrent => {
      const page = 1;
      const limit = 999;
      return axios.get(
        `/event/past-current?page=${page}&limit=${limit}&organizerId=${organizerId}&current=${isCurrent.value}`,
      );
    };

    return useQuery(
      ['organizer-current-future-event', organizerId, isCurrentEvent],
      () => fetchFavouriteEventsRequest(isCurrentEvent),
      {
        retry: 1,
        select: response => {
          return response?.data;
        },
      },
    );
  };

  //Publish/Un-Publish Event
  const useHandlePublishEventService = (eventId, userId, status) => {
    const HandlePublishEventRequest = () => {
      return axiosInstance.put(
        `/event/publish?eventId=${eventId}&userId=${userId}`,
        {status: status},
      );
    };

    const onError = error => {
      Toast.show(error.response.data.message);
    };
    const onSuccess = () => {
      Toast.show(`Event ${status ? 'Published' : 'Un-Published'}`);
      queryClient.invalidateQueries(['user-events', userId]);
    };
    return useMutation(() => HandlePublishEventRequest(), {
      retry: 0,
      onSuccess,
      onError,
    });
  };

  //Delete Event
  const useHandleDeleteEventService = (eventId, userId) => {
    const HandleDeleteEventRequest = () => {
      return axiosInstance.delete(`/event/?eventId=${eventId}`);
    };

    const onSuccess = () => {
      Toast.show('Event Deleted');
      queryClient.invalidateQueries(['user-events', userId]);
    };
    return useMutation(eventId => HandleDeleteEventRequest(eventId), {
      retry: 0,
      onSuccess,
    });
  };

  //Search Tags
  const useHandleSearchTagsService = (isEnabled, tagValue) => {
    const handleSearchTags = () => {
      const page = 1;
      const limit = 9999;
      return axiosInstance.get(
        `/tags/search?page=${page}&limit=${limit}&searchQuery=${tagValue}`,
      );
    };

    return useQuery(['search-tags', tagValue], () => handleSearchTags(), {
      retry: 0,
      select: response => {
        return response.data.data;
      },
      enabled: isEnabled,
    });
  };

  //Create Event
  const useHandleCreateEventService = userId => {
    const handleCreateEventRequest = data => {
      return axiosInstance.post(`/event/?userId=${userId}`, data);
    };

    const onSuccess = () => {
      Toast.show('Event Created');
      navigation.navigate(routes.home);
    };
    const onError = error => {
      Toast.show(error.response.data.message);
    };

    return useMutation(eventData => handleCreateEventRequest(eventData), {
      onError,
      onSuccess,
      retry: 0,
    });
  };

  //Edit Event
  const useHandleEditEventService = eventId => {
    const userId = TokenService.getUser()?._id;

    const handleEditEventRequest = (data, id) => {
      return axios.put(`/event/?userId=${userId}&eventId=${id.value}`, data);
    };

    const onSuccess = () => {
      useToaster('success', 'Success', 'Event Updated');

      router.push({name: ROUTES.MANAGE_EVENTS});
    };
    const onError = error => {
      useToaster('danger', 'Error', viewError(error.response.data.message));
    };

    return useMutation(
      eventData => handleEditEventRequest(eventData, eventId),
      {
        onError,
        onSuccess,
        retry: 0,
      },
    );
  };

  //Delete Event Media
  const useHandleDeleteEventMediaService = eventId => {
    const userId = TokenService.getUser()?._id;

    const handleDeleteEventMediaRequest = (id, media) => {
      return axios.delete(`/event/image?userId=${userId}&eventId=${id.value}`, {
        data: {fileName: media},
      });
    };

    const onError = error => {
      useToaster('danger', 'Error', viewError(error.response.data.message));
    };

    return useMutation(media => handleDeleteEventMediaRequest(eventId, media), {
      onError,
      retry: 0,
    });
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
    useHandlePurchaseEventService,
    useFetchRemainingTickesService,
    useFetchOrganizerTicketOrdersService,
    useHandlePublishEventService,
    useHandleDeleteEventService,
    useHandleSearchTagsService,
    useHandleCreateEventService
  };
};
