export class GeoLocationService {
    static init() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                const error = {
                    message: 'Geolocation is not supported by this browser.'
                };
                reject(error);
            }
        });
    }
}