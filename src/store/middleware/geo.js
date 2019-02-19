import { GeoLocationService } from '../../services/GeoLocationService';//todo webpack parse path
import { getWeatherByGeo } from '../../scenes/Weather/modules/Weather.index';//todo webpack parse path

export const GEO = Symbol('GEO');

export function makeRequestAction(requestType) {
    return {
        type: requestType
    }
}

export default store => next => action => {
    const request = action[GEO];
    if (typeof request === 'undefined') {
        return next(action);
    }

    const {types: [requestType, successType, errorType]} = request;

    const successRequest = (response) => {
        if (successType) {

            const {
                latitude,
                longitude
            } = response.coords;

            store.dispatch(getWeatherByGeo(latitude, longitude));

            return next({
                response: {
                    latitude,
                    longitude
                },
                type: successType
            })
        }
    };

    const errorRequest = (error) => {
        if (errorType) {
            return next({
                error,
                type: errorType
            })
        }

    };

    store.dispatch(makeRequestAction(requestType));

    const geoRequest = GeoLocationService.init();
    geoRequest.then(successRequest, errorRequest);

    return geoRequest;
}