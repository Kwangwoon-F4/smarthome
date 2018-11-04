import React, { Component } from 'react';
import rgbImg from 'static/images/rgb.png';

class LightColor extends Component {
    state = {
        rgb: "#ffffff"
    };

    render() {
        return (
            <div className="valueContainer">
                <div className="valueImg">
                    <img src={rgbImg} alt="light-color"/>
                </div>
                <div className="valueName">
                    Light Color
                </div>
            </div>
        )
    }
}

export default LightColor;