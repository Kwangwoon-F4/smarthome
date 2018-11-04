import React, { Component } from 'react';
import sleepImg from 'static/images/clock.png';

class Sleeptime extends Component {
    state = {
        sleepTime: "21:00"
    };

    render() {
        return (
            <div className="valueContainer">
                <div className="valueImg">
                    <img src={sleepImg} alt="sleep-time"/>
                </div>
                <div className="valueName">
                    Sleep Time
                </div>
            </div>
        )
    }
}

export default Sleeptime;