import { Http } from './HttpClient';

export const CALL_API = Symbol('Call API');

export function makeRequestAction(requestType) {
    return {
        type: requestType
    }
}

export default store => next => action => {
    const request = action[CALL_API];
    if (typeof request === 'undefined') {
        return next(action);
    }

    const {types: [requestType, successType, errorType]} = request;

    const successRequest = (response) => {
        if (request.logger) {}

        if (successType) {
            return next({
                response,
                type: successType
            })
        }
    };

    const errorRequest = (error) => {
        if (request.logger) {}

        if (errorType) {
            return next({
                error,
                type: errorType
            })
        }

    };

    store.dispatch(makeRequestAction(requestType));

    const apiRequest = Http[request.method.toLowerCase()](request);
    apiRequest.promise.then(successRequest, errorRequest);

    return apiRequest;
}

