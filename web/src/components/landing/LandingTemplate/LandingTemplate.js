import React, { Component } from 'react';
import './LandingTemplate.scss';

import LogoSection from '../LogoSection';
import ValueSection from '../ValueSection';

class LandingTemplate extends Component {
    state = {
      id: 0,
      humidity: 2,
      light: 2,
      lightColor: "#ffffff",
      temperature: 23,
      sleeptime: "21:00"
    };
    async ComponentDidMount ()  {
        this.setState({

        })
    }

    handleUpdate = async(data) => {
        await this.setState({
            humidity: data.humidity,
            light: data.light,
            lightColor: data.lightColor,
            temperature: data.temperature,
            sleeptime: data.sleeptime
        });
        console.log(this.state);
    };

  render() {
    let state = this.state;
    return (
      <div className="landing">
        <LogoSection/>
        <ValueSection
            humidity={state.humidity}
            light={state.light}
            lightColor={state.lightColor}
            temperature={state.temperature}
            sleeptime={state.sleeptime}
            handleUpdate={this.handleUpdate}
        />
        <div className="sendBtn">
          <button>적용하기</button>
        </div>
      </div>
    )
  }
}

export default LandingTemplate;