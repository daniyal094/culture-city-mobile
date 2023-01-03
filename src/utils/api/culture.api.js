import {useQuery} from '@tanstack/react-query';
import axiosInstance from '../config/axios-instance';
import Toast from 'react-native-simple-toast';
export default useCultureApi = () => {


    //Get All Cultures
    const useFetchAllCulturesService = () => {
      const FetchAllCulturesRequest = () => {
          return axiosInstance.get(`/culture/all?page=1&limit=9999`)
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
    useFetchAllCulturesService
  };
};
