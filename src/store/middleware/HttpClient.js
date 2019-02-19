export class Http {
    static createRequestProxy(request, params) {
        let xhr;
        let promise = new Promise((resolve, reject) => {
            xhr = Http.createRequest(resolve, reject, request);
            xhr.send(params);
        });

        return {
            promise,
            xhr
        }
    }

    static createRequest(resolve, reject, request) {
        const xhr = new XMLHttpRequest();

        xhr.open(request.method, window.location.origin + request.endpoint);
        xhr.setRequestHeader('Content-Type', request.contentType);

        xhr.onload = () => {
            (xhr.status >= 200 && xhr.status < 300)
                ? resolve(Http.transformSuccessResponse(xhr))
                : reject(Http.transformErrorResponse(xhr));
        };

        xhr.onerror = () => reject(Http.transformErrorResponse(xhr));
        xhr.onabort = () => reject(Http.transformErrorResponse(xhr));

        return xhr;
    }

    static get(request) {
        const url = new URL(request.endpoint, window.location.origin);
        request.endpoint = url.pathname + url.search;

        return Http.createRequestProxy(request);
    }

    static transformErrorResponse(xhr) {
        let response = xhr.response;
        if (Http.isJsonString(xhr.response)) {
            response = JSON.parse(xhr.response);
        }
        return {
            response,
            status: xhr.status
        };
    }

    static transformSuccessResponse(xhr) {
        let response = xhr.response;
        if (Http.isJsonString(response)) {
            response = JSON.parse(response);
        }
        return response;
    }

    static isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}
