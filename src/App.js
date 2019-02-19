import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { WeatherRouter } from './scenes/WeatherRouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

export class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <hr/>
                    <WeatherRouter/>
                    <hr/>
                    <Footer/>
                </div>
            </Router>
        );
    }
}
