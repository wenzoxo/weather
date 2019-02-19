import React, { Component } from 'react';
import { Route } from "react-router-dom";

import { Weather } from './Weather'
import { Manage } from './Manage';

export class WeatherRouter extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={ Weather }/>
                <Route path="/manage" component={ Manage }/>
            </div>
        );
    }
}
