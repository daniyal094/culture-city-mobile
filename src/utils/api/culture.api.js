import {useQuery} from '@tanstack/react-query';
import axiosInstance from '../config/axios-instance';
import Toast from 'react-native-simple-toast';
export default useCultureApi = () => {
  //Get All Culture Groups
  const useFetchAllCultureGroupsService = () => {
    const FetchAllCultureGroupsRequest = () => {
      return axiosInstance.get(`/culture/group?page=1&limit=999`);
    };
    return useQuery(['all-culture-groups'], FetchAllCultureGroupsRequest, {
      retry: 1,
      select: response => {
        return response?.data?.data;
      },
    });
  };

  //Get All Time Zone
  const useFetchAllTimeZoneService = () => {
    const FetchAllTimeZoneRequest = () => {
      return axiosInstance.get(`/timezone/all?page=1&limit=999`);
    };
    return useQuery(['all-timezone'], FetchAllTimeZoneRequest, {
      retry: 1,
      select: response => {
        return response?.data?.data;
      },
    });
  };
  return {
    useFetchAllCultureGroupsService,
    useFetchAllTimeZoneService,
  };
};
