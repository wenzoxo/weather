import { createSelector } from 'reselect';
import { IMG_URL } from '../../../config.js';//todo webpack parse path

const _getResultsWeather = state => state.weatherReducer.weatherInfo;

export const GeoWeatherSelector = createSelector([_getResultsWeather], results => {
    const hasProperty = !!Object.keys(results.geoResults).length;
    return {
        geoResults: hasProperty ?
            {
                city: results.geoResults.name,
                country: results.geoResults.sys.country,
                icon: `${IMG_URL}/w/${results.geoResults.weather[0].icon}.png`,
                googleImg: `http://maps.googleapis.com/maps/api/staticmap?center=${results.coords.latitude},${results.coords.longitude}&zoom=13&size=300x300&sensor=false`,
                condition: results.geoResults.weather[0].description,
                temp: Math.round(results.geoResults.main.temp),
                windSpeed: Math.round(results.geoResults.wind.speed * 3.6)
            }
            : {},
        loadedGeoWeather: results.loadedGeoWeather
    }
});

export const GeoErrorSelector = state => state.weatherReducer.weatherInfo.coords.msg;

export const WeatherSelector = createSelector([_getResultsWeather], ({results}) => {

    return results.map((city) => {
        return {
            name: city.name,
            icon: `${IMG_URL}/w/${city.weather[0].icon}.png`,
            condition: city.weather[0].description,
            temp: Math.round(city.main.temp)
        }
    })
});