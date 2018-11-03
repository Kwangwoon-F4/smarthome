import React, { Component } from 'react';
import CircularSlider from 'react-circular-slider-bar';
import './ValueSection.scss';

class ValueSection extends Component {

    state = {
        value: 0
    };

    render() {
        return(
            <div className="slider">
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
            </div>
        )
    }
}

export default ValueSection;