import React, { Component } from 'react';
import humidityImg from 'static/images/humidity.png';
import './Humidity.scss';


class Humidity extends Component {
    state = {
        humidity : 2
    };

    render() {
        return (
            <div className="valueContainer">
                <div className="valueImg">
                    <img src={humidityImg} alt="humidity"/>
                </div>
                <div className="valueName">
                    Humidity
                </div>
            </div>
        )
    }
}

export default Humidity;