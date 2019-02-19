import React, { Component } from 'react';

export class CitiesWeather extends Component {
    render() {
        const {
            weather
        } = this.props;

        return (
            <div>
                {
                    weather.map((city, inx) => {
                        return <p key={ inx }>
                            { city.name }
                            <img src={ city.icon } alt=""/><br/>
                            <span>condition: { city.condition } </span><br/>
                            <span> temp: { city.temp }</span>
                        </p>
                    })
                }
            </div>
        )
    }
}
