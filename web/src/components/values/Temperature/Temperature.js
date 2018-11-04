import React, { Component } from 'react';
import temperatureImg from 'static/images/temperature.png';

class Temperature extends Component {
    state = {
        temperature: 23
    };

    render() {
        return (
            <div className="valueContainer">
                <div className="valueImg">
                    <img src={temperatureImg} alt="temperature"/>
                </div>
                <div className="valueName">
                    Temperature
                </div>
            </div>
        )
    }
}

export default Temperature;