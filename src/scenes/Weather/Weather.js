import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { combineReducers } from 'redux';

import { GeoWeatherSelector, GeoErrorSelector, WeatherSelector } from './modules/Weather.selectors';
import { getWeather, getGeoLocation, cleanup, reducer } from './modules/Weather.index';
import { CacheService } from '../../services/CacheService'

import { GeoWeather } from './components/GeoWeather'
import { AddCityForm } from './components/AddCityForm'
import { CitiesWeather } from './components/CitiesWeather'
import './Weather.scss';

@connect((state) => ({
    geoWeather: GeoWeatherSelector(state),
    weather: WeatherSelector(state),
    geoError: GeoErrorSelector(state)
}), {getWeather, getGeoLocation, cleanup})
export class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: []
        };
    }

    componentDidMount() {
        this.asyncMultipleRequest();//todo move to middleware ...
        this.props.getGeoLocation();
    }

    //todo cleanUp
    componentWillUnmount() {
        this.setState({
            city: []
        });

        this.props.cleanup()
    }

    async asyncMultipleRequest() {
        const cities = CacheService.getLocalStorageItem();

        cities.length && await Promise.all(cities.map(async el => {
            await this.props.getWeather(el).promise;
        }));
    }

    @autobind
    addNewCity(city) {
        this.props.getWeather(city);

        this.setState({
            city: [
                ...this.state.city,
                city
            ]
        });
    };


    render() {
        const {
            geoWeather
        } = this.props;

        return (
            <div>
                <h1>Geo Weather</h1>

                {
                    geoWeather.loadedGeoWeather ?
                        <GeoWeather
                            geoResults={ geoWeather.geoResults }
                        />
                        : this.props.geoError
                }

                <h1>Add new city</h1>
                <span>helper: New York, Rio de Janeiro, Kyiv</span>
                <AddCityForm
                    addNewCity={ this.addNewCity }/>

                <h1>weather in cities</h1>
                <CitiesWeather
                    weather={ this.props.weather }
                />
            </div>
        )
    }
}

export const weatherReducer = combineReducers({
    weatherInfo: reducer
});
