import React, { Component } from 'react';
//import CircularSlider from 'react-circular-slider-bar';
import './ValueSection.scss';

import Humidity from 'components/values/Humidity';
import Temperature from "components/values/Temperature/Temperature";
import Light from "components/values/Light/Light";
import LightColor from "components/values/LightColor/LightColor";
import Sleeptime from "components/values/Sleeptime/Sleeptime";

class ValueSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            humidity: this.props.humidity,
            light: this.props.light,
            lightColor: this.props.lightColor,
            temperature: this.props.temperature,
            sleeptime: this.props.sleeptime
        };
    }

    sendValue = () => {
        this.props.handleUpdate(this.state);
    };

    onHumidityUpdate = async (data) => {
        await this.setState({
          humidity: data.value
      });
      this.sendValue();
    };
    onLightUpdate = async (data) => {
        await this.setState({
            light: data.value
        });
        this.sendValue();
    };
    onLightColorUpdate = async (data) => {
        await this.setState({
            lightColor: data.value
        });
        this.sendValue();
    };
    onTemperatureUpdate = async (data) => {
        await this.setState({
            temperature: data.value
        });
        this.sendValue();
    };
    onSleeptimeUpdate = async (data) => {
        await this.setState({
            sleeptime: data.value
        });
        console.log("after onUpdate");
        console.log(this.state);
        this.sendValue();
    };

    render() {
        let value = this.state;
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
                <Humidity
                    value={value.humidity}
                    onUpdate={this.onHumidityUpdate}
                />
                <Temperature
                    value={value.temperature}
                    onUpdate={this.onTemperatureUpdate}
                />
                <Light
                    value={value.light}
                    onUpdate={this.onLightUpdate}
                />
                <LightColor
                    value={value.lightColor}
                    onUpdate={this.onLightColorUpdate}
                />
                <Sleeptime
                    value={value.sleeptime}
                    onUpdate={this.onSleeptimeUpdate}
                />
            </div>
        )
    }
}

export default ValueSection;