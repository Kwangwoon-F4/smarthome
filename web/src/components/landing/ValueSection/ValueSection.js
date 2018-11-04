import React, { Component } from 'react';
import CircularSlider from 'react-circular-slider-bar';
import './ValueSection.scss';

import Humidity from 'components/values/Humidity';
import Temperature from "components/values/Temperature/Temperature";
import Light from "components/values/Light/Light";
import LightColor from "components/values/LightColor/LightColor";
import Sleeptime from "components/values/Sleeptime/Sleeptime";

class ValueSection extends Component {

    state = {
        value: 0
    };

    render() {
        return(
            <div className="valueSection">
                {/*<div className="slider">
                    <CircularSlider
                        r={75}
                        trackColor="#ffffff80"
                        trackWidth={3}
                        arcColor="#decb51"
                        thumbWidth={5}
                        value={this.state.value}
                        onChange={value => this.setState({ value })}
                    />
                    <span>{Math.round(this.state.value)}</span>
                </div>*/}
                <Humidity/>
                <Temperature/>
                <Light/>
                <LightColor/>
                <Sleeptime/>
            </div>
        )
    }
}

export default ValueSection;