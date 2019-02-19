import React from 'react';
import './GeoWeather.scss';

export const GeoWeather = props => {
    const {
        city,
        country,
        icon,
        condition,
        temp,
        windSpeed,
        googleImg
    } = props.geoResults;

    return (
        <div>
            <h3>map: </h3>
            <table>
                <tbody>
                    <tr>
                        <td><img src={ googleImg } alt=""/></td>
                        <td>
                            <p>city: { city }</p>
                            <p>country: { country } <img src={ icon } alt=""/></p>
                            <p>condition: { condition }</p>
                            <p>temp: { temp }</p>
                            <p>windSpeed: { windSpeed }</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};
