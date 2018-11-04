import React, { Component } from 'react';
import lightImg from 'static/images/light-bulb.png';

class Light extends Component {
    state = {
        light: 2
    };

    render() {
        return (
            <div className="valueContainer">
                <div className="valueImg">
                    <img src={lightImg} alt="light"/>
                </div>
                <div className="valueName">
                    Light
                </div>
            </div>
        )
    }
}

export default Light;