import { CALL_API } from '../../../store/middleware/api';//todo webpack parse path
import { GEO } from '../../../store/middleware/geo';//todo webpack parse path
import {
    API_URL,
    API_KEY
} from '../../../config';
import { CacheService } from '../../../services/CacheService/CacheService';
//todo webpack parse path
//todo webpack parse path

export const GET_WEATHER_REQUEST = 'GET_WEATHER_REQUEST';
export const GET_WEATHER_SUCCESS = 'GET_WEATHER_SUCCESS';
export const GET_WEATHER_ERROR = 'EXPORT_QUEUE_ERROR';

export const GET_GEO_WEATHER_REQUEST = 'GET_GEO_WEATHER_REQUEST';
export const GET_GEO_WEATHER_SUCCESS = 'GET_GEO_WEATHER_SUCCESS';
export const GET_GEO_WEATHER_ERROR = 'GET_GEO_WEATHER_ERROR';

export const GET_GEO_REQUEST = 'GET_GEO_REQUEST';
export const GET_GEO_SUCCESS = 'GET_GEO_SUCCESS';
export const GET_GEO_ERROR = 'GET_GEO_ERROR';

export const CLEANUP_WEATHER_PAGE = 'CLEANUP_WEATHER_PAGE';

function getInitialState() {
    return {
        loadingWeather: false,
        gettingGeo: false,
        loadedGeoWeather: false,
        coords: {},
        results: [],
        geoResults: {}
    }
}

export function reducer(state = getInitialState(), action = {}) {
    switch (action.type) {

        case GET_GEO_REQUEST:
            return {
                ...state,
                gettingGeo: true
            };

        case GET_GEO_SUCCESS:
            return {
                ...state,
                gettingGeo: false,
                coords: {
                    ...action.response
                }
            };

        case GET_GEO_ERROR:
            return {
                ...state,
                coords: {
                    msg: action.error.message
                },
                gettingGeo: false
            };

        case GET_WEATHER_REQUEST:
            return {
                ...state,
                loadingWeather: true
            };

        case GET_WEATHER_SUCCESS:
            CacheService.mutateLocalStorageItem(action.response.name);
            return {
                ...state,
                loadingWeather: false,
                results: [
                    ...state.results,
                    {
                        ...action.response
                    }
                ]
            };

        case GET_WEATHER_ERROR:
            return {
                ...state,
                loadingWeather: false
            };

        case GET_GEO_WEATHER_REQUEST:
            return {
                ...state,
                loadedGeoWeather: false
            };

        case GET_GEO_WEATHER_SUCCESS:
            CacheService.mutateLocalStorageItem(action.response.name);
            return {
                ...state,
                loadedGeoWeather: true,
                geoResults: {
                    ...action.response
                }
            };

        case CLEANUP_WEATHER_PAGE:
            return getInitialState();

        case GET_GEO_WEATHER_ERROR:
            return {
                ...state,
                loadedGeoWeather: false
            };

        default:
            return state;
    }
}

export function getWeather(city) {
    return {
        [CALL_API]: {
            endpoint: `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`,
            method: 'GET',
            contentType: 'application/json',
            types: [GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_ERROR]
        }
    }
}

export function getWeatherByGeo(latitude, longitude) {
    return {
        [CALL_API]: {
            endpoint: `${API_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
            method: 'GET',
            contentType: 'application/json',
            types: [GET_GEO_WEATHER_REQUEST, GET_GEO_WEATHER_SUCCESS, GET_GEO_WEATHER_ERROR]
        }
    }
}

export function getGeoLocation() {
    return {
        [GEO]: {
            types: [GET_GEO_REQUEST, GET_GEO_SUCCESS, GET_GEO_ERROR]
        }
    }
}

export function cleanup() {
    return {
        type: CLEANUP_WEATHER_PAGE
    }
}