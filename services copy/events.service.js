import axios from "@/config/axios-instance";
import TokenService from "./token.service";
import { useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import {useRoute, useRouter} from "vue-router";
import useToaster from "@/composables/use-toaster";
import {ROUTES} from "@/utils/constants/routes";
import {ROLES} from "@/utils/constants";

const useEventsService = () => {
    const router = useRouter()
    const queryClient = new useQueryClient()

    //Search Tags
    const useHandleSearchTagsService = (isEnabled,tagValue) => {

        const handleSearchTags = (tagValue) => {
            const page = 1;
            const limit = 20
            return axios.get(`/tags/search?page=${page}&limit=${limit}&searchQuery=${tagValue.value}`)
        }

        return useQuery(
            ['search-tags',tagValue],
            () => handleSearchTags(tagValue),
            {
                retry:0,
                select:(response)=>{
                    return response.data.data.map((tag)=> {
                        return{
                            ...tag,
                            text:tag?.name
                        }
                    })
                },
                enabled : isEnabled
            }
        )

    }

    //Search Culture
    const useHandleSearchCultureService = (isEnabled,cultureValue) => {

        const handleSearchCulture = (cultureValue) => {
            const page = 1;
            const limit = 20
            return axios.get(`/culture/search?page=${page}&limit=${limit}&searchQuery=${cultureValue.value}`)
        }

        return useQuery(
            ['search-cultures',cultureValue],
            () => handleSearchCulture(cultureValue),
            {
                retry:0,
                select:(response)=>{
                    return response.data.data.map((culture)=> {
                        return{
                            ...culture,
                            text:Array.isArray(culture?.cultures) ? culture?.cultures[0] : ''
                        }
                    })
                },
                enabled : isEnabled
            }
        )

    }

    //Search Culture Group
    const useHandleSearchCultureGroupService = (isEnabled,cultureGroupValue) => {

        const handleSearchCultureGroup = (cultureGroupValue) => {
            const page = 1;
            const limit = 20
            return axios.get(`/culture/search-group?page=${page}&limit=${limit}&searchQuery=${cultureGroupValue.value}`)
        }

        return useQuery(
            ['search-culture-group',cultureGroupValue],
            () => handleSearchCultureGroup(cultureGroupValue),
            {
                retry:0,
                select:(response)=>{
                    return response.data.data.map((cultureGroup)=> {
                        return{
                            ...cultureGroup,
                            text:cultureGroup?.cultureGroup
                        }
                    })
                },
                enabled : isEnabled
            }
        )

    }

    //Fetch Event Types
    const useFetchEventTypesService = () => {

        const fetchEventTypes = () => {
            const page = 1;
            const limit = 99
            return axios.get(`/event-types/all?page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['event-types'],
            fetchEventTypes,
            {
                retry:0,
                select : (response) => {
                    return response?.data?.data.map((event)=>event.name)
                }
            }
        )
    }

    //Fetch Timezones
    const useFetchTimezonesService = () => {

        const fetchTimezones = () => {
            const page = 1;
            const limit = 999
            return axios.get(`/timezone/all?page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['timezones-list'],
            fetchTimezones,
            {
                retry:0,
                select : (response) => {
                    return response?.data?.data.map((timezone)=>{
                        return{
                            _id : timezone?.timezone,
                            name : timezone?.label
                        }
                    })
                }
            }
        )

    }

    //Create Event
    const useHandleCreateEventService = () => {
        const userId = TokenService.getUser()?._id
        const handleCreateEventRequest = (data) => {
            return axios.post(`/event/?userId=${userId}`,data)
        }

        const onSuccess = () => {
            useToaster("success","Success","Event Created")

            router.push({name:ROUTES.MANAGE_EVENTS})
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (eventData) => handleCreateEventRequest(eventData),
            {
                onError,
                onSuccess,
                retry:0
            }
        )
    }

    //Edit Event
    const useHandleEditEventService = (eventId) => {
        const userId = TokenService.getUser()?._id

        const handleEditEventRequest = (data,id) => {
            return axios.put(`/event/?userId=${userId}&eventId=${id.value}`,data)
        }

        const onSuccess = () => {
            useToaster("success","Success","Event Updated")

            router.push({name:ROUTES.MANAGE_EVENTS})
        }
        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (eventData) => handleEditEventRequest(eventData,eventId),
            {
                onError,
                onSuccess,
                retry:0
            }
        )
    }

    //Delete Event Media
    const useHandleDeleteEventMediaService = (eventId) => {
        const userId = TokenService.getUser()?._id

        const handleDeleteEventMediaRequest = (id,media) => {
            return axios.delete(`/event/image?userId=${userId}&eventId=${id.value}`, {data: {fileName:media}})
        }


        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (media) => handleDeleteEventMediaRequest(eventId,media),
            {
                onError,
                retry:0
            }
        )
    }

    //Search Event
    const useHandleSearchEventService = (eventType,culture,isFree,eventCat,dateFilter,query) => {

        const handleSearchEventRequest = (eventType,culture,isFree,eventCat,dateFilter,query) => {
            const page = 1
            const limit = 99
            return axios.get(`/event/browse?page=${page}&limit=${limit}${culture.value}${eventType.value}&isFree=${isFree.value}&category=${eventCat.value}&dateFilter=${dateFilter.value}&date&searchQuery=${query.value}`)
        }

        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))

        }

        return useQuery(
            ['search-event',eventType,culture,isFree,eventCat,dateFilter,query],
            () => handleSearchEventRequest(eventType,culture,isFree,eventCat,dateFilter,query),
            {
                onError,
                retry:1,
                select:(response)=>response?.data?.data
            }
        )
    }

    //Fetch User Events
    const useFetchUserEventsService = () => {
        const userId = TokenService.getUser()?._id
        const fetchUserEventsRequest = () => {
            const page = 1;
            const limit = 999
            return axios.get(`/event/my?userId=${userId}&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['user-events',userId],
            fetchUserEventsRequest,
            {
                retry:0,
            }
        )

    }

    //Fetch Event By Id
    const useFetchEventByIdService = (eventId) => {
        const fetchEventByIdRequest = (id) => {
            return axios.get(`/event/?eventId=${id.value}`)
        }
        const onError = (error) => {
            if(error.response.status === 400){
                router.push({name:ROUTES.HOME})
            }
        }
        return useQuery(
            ['event',eventId],
            ()=>fetchEventByIdRequest(eventId),
            {
                retry:1,
                onError,
                select: (response) => {
                    return response?.data?.data
                },
                enabled:!!eventId
            }
        )

    }

    //Fetch Events by Event Types
    const useFetchEventByTypesService = () => {
        const fetchEventByTypesRequest = () => {
            return axios.get(`/event-types/events`)
        }

        return useQuery(
            ['events-by-event-types'],
            fetchEventByTypesRequest,
            {
                retry:1,
                select: (response) => {
                    return response?.data?.data?.filter((event)=> event.events?.length >= 1)
                }
            }
        )

    }

    //Fetch Favourite Events
    const useFetchFavouriteEventsService = (isEnabled = true) => {
        const userId = TokenService.getUser()?._id
        const userRole = TokenService.getUser()?.role
        const fetchFavouriteEventsRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/favourite?userId=${userId}&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['favourite-events',userId],
            fetchFavouriteEventsRequest,
            {
                retry:1,
                enabled : userRole === ROLES.SEEKER && isEnabled,
                select: (response) => {
                    return {
                        ...response?.data,
                        data : response?.data?.data?.map((favouriteEvents)=>favouriteEvents?.event)
                    }
                }
            }
        )

    }

    //Fetch Featured Events
    const useFetchFeaturedEventsService = (isEnabled = true) => {
        const userId = TokenService.getUser()?._id

        const fetchFeaturedEventsRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/event/featured-popular?isFeatured=true&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['featured-events',userId],
            fetchFeaturedEventsRequest,
            {
                retry:1,
                enabled :isEnabled,
            }
        )

    }

    //Fetch Popular Events
    const useFetchPopularEventsService = (isEnabled = true) => {
        const userId = TokenService.getUser()?._id
        const fetchPopularEventsRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/event/featured-popular?isFeatured=false&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['popular-events',userId],
            fetchPopularEventsRequest,
            {
                retry:1,
                enabled : isEnabled,
            }
        )

    }

    //Fetch Nearby Events
    const useFetchNearbyEventsService = ({latitude, longitude}) => {
        const fetchNearbyEventsRequest = (lat,long) => {
            const page = 1
            const limit = 999
            if(long?.value && lat?.value){
                return axios.get(`/event/near-by?longitude=${long?.value}&latitude=${lat?.value}&page=${page}&limit=${limit}`)
            }
        }

        const onError = (error) => {
            if(error.response.status === 400){
                console.log('error')
            }
        }
        return useQuery(
            ['nearby-events',latitude || '',longitude || ''],
            ()=>fetchNearbyEventsRequest(latitude,longitude),
            {
                retry:0,
                // enabled :false,
                onError,
                select:(response)=>response?.data?.data
            }
        )

    }

    //Fetch Popular/Upcoming/Featured Events
    const useFetchPUFEventsService = () => {
        const fetchPUFEventsRequest = () => {
            return axios.get(`/event/home-page`)
        }

        return useQuery(
            ['PUF-events'],
            fetchPUFEventsRequest,
            {
                retry:1,
                select:(response)=>response.data?.data,
            }
        )

    }

    //Fetch Organizer's Current/Past Events
    const useFetchOrganizerCurrentPastEventsService = (isCurrentEvent) => {
        const route = useRoute()
        const organizerId = route?.params?.organizerId

        const fetchFavouriteEventsRequest = (isCurrent) => {
            const page = 1
            const limit = 999
            return axios.get(`/event/past-current?page=${page}&limit=${limit}&organizerId=${organizerId}&current=${isCurrent.value}`)
        }

        return useQuery(
            ['organizer-current-future-event',organizerId,isCurrentEvent],
            ()=>fetchFavouriteEventsRequest(isCurrentEvent),
            {
                retry:1,
                select: (response) => {
                    return response?.data
                }
            }
        )

    }

    //Fetch Seeker Tickets
    const useFetchSeekerEventTicketsService = () => {
        const userId = TokenService.getUser()?._id
        const fetchSeekerEventTicketsRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/booking/?seekerId=${userId}&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['tickets',userId],
            fetchSeekerEventTicketsRequest,
            {
                retry:1,
                select: (response) => {
                    return response?.data?.data
                }
            }
        )

    }

    //Fetch Organizer Ticket Orders
    const useFetchOrganizerTicketOrdersService = () => {
        const userId = TokenService.getUser()?._id
        const fetchOrganizerTicketOrdersRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/booking/orders?organizerId=${userId}&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['ticket-orders',userId],
            fetchOrganizerTicketOrdersRequest,
            {
                retry:1,
                select: (response) => {
                    return response?.data?.data
                }
            }
        )

    }

    //Publish/Un-Publish Event
    const useHandlePublishEventService = (eventId,status) => {
        const userId = TokenService?.getUser()?._id
        const HandlePublishEventRequest = (eventId,status) => {
            return axios.put(`/event/publish?eventId=${eventId.value}&userId=${userId}`, {status:status.value})
        }

        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }
        const onSuccess = () => {
            useToaster("success","Success",`Event ${status.value ? "Published" : "Un-Published"}`)
            queryClient.invalidateQueries(['user-events',userId])
        }
        return useMutation(
            ()=>HandlePublishEventRequest(eventId,status),
            {
                retry:0,
                onSuccess,
                onError,
            }
        )

    }

    //Delete Event
    const useHandleDeleteEventService = () => {
        const userId = TokenService?.getUser()?._id
        const HandleDeleteEventRequest = (eventId) => {
            return axios.delete(`/event/?eventId=${eventId}`)
        }

        const onSuccess = () => {
            useToaster("success","Success",`Event Deleted`)
            queryClient.invalidateQueries(['user-events',userId])
        }
        return useMutation(
            (eventId)=>HandleDeleteEventRequest(eventId),
            {
                retry:0,
                onSuccess,
            }
        )

    }

    //Purchase Tickets
    const useHandlePurchaseTicketsService = (eventId) => {
        const userId = TokenService?.getUser()?._id

        const HandlePurchaseTicketsRequest = (tickets,id) => {
            return axios.post(`/booking/?userId=${userId}&eventId=${id.value}`,tickets)
        }

        const onSuccess = (response) => {
            useToaster("success","Success","Tickets Purchased")

            if(typeof response?.data?.data === "string"){
                window.location.href = response.data.data
            }else{
                router.push({name:ROUTES.TICKETS})
            }
        }

        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }
        return useMutation(
            (tickets)=>HandlePurchaseTicketsRequest(tickets,eventId),
            {
                retry:0,
                onSuccess,
                onError
            }
        )

    }

    //Add Event To Favourite
    const useHandleAddEventToFavouriteService = () => {
        const userId = TokenService?.getUser()?._id

        const HandleAddEventToFavouriteRequest = (eventId) => {
            return axios.post(`/favourite?userId=${userId}&eventId=${eventId}`)
        }


        const onError = (error) => {
            useToaster("danger","Error",error.response.data.message)
        }
        return useMutation(
            (eventId)=>HandleAddEventToFavouriteRequest(eventId),
            {
                retry:0,
                onError,
            }
        )

    }

    //Add Event To Favourite
    const useHandleRemoveEventFromFavouriteService = () => {
        const userId = TokenService?.getUser()?._id

        const handleRemoveEventFromFavouriteRequest = (eventId) => {
            return axios.delete(`/favourite?userId=${userId}&eventId=${eventId}`)
        }


        const onError = (error) => {
            useToaster("danger","Error",error.response.data.message)
        }
        return useMutation(
            (eventId)=>handleRemoveEventFromFavouriteRequest(eventId),
            {
                retry:0,
                onError,
            }
        )

    }



    return {useHandleSearchTagsService,useFetchEventTypesService,useFetchTimezonesService
    ,useHandleCreateEventService,useFetchUserEventsService,useHandlePublishEventService,useFetchEventByIdService
    ,useHandlePurchaseTicketsService,useHandleAddEventToFavouriteService,useFetchFavouriteEventsService
        ,useFetchEventByTypesService,useFetchSeekerEventTicketsService,useFetchOrganizerTicketOrdersService,
        useHandleDeleteEventService,useFetchOrganizerCurrentPastEventsService,
        useHandleSearchEventService,useHandleSearchCultureService,useHandleSearchCultureGroupService,
        useHandleEditEventService,useHandleDeleteEventMediaService,useFetchPUFEventsService
    ,useFetchPopularEventsService,useFetchFeaturedEventsService,useFetchNearbyEventsService,useHandleRemoveEventFromFavouriteService}
};

export default useEventsService;
