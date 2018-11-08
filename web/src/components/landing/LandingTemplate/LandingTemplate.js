import React, { Component } from 'react';
import axios from 'axios';
import './LandingTemplate.scss';

import LogoSection from '../LogoSection';
import ValueSection from '../ValueSection';
import Serve from 'service/Service';

class LandingTemplate extends Component {
    state = {
      id: 100,
      name: 'no-name',
      humidity: 2,
      light: 2,
      lightColor: 255255255,    // #ffffff
      temperature: 23,
      sleeptime: 2100,           // 21:00
      onOff: 1
    };

    async ComponentDidMount ()  {
        this.setState({

        })
    }

    handleUpdate = async (data) => {
        await this.setState({
            humidity: data.humidity,
            light: data.light,
            lightColor: data.lightColor,
            temperature: data.temperature,
            sleeptime: data.sleeptime
        });
        console.log(this.state);
    };
    delay = (ms) => {
        ms += new Date().getTime();
        while (new Date() < ms){}
    };

    postValue = (endpointUrl, stateValue) => {
        axios.post(endpointUrl, {
            value: stateValue,
        }).then((response) => {
            console.log(response.data);
            let res = endpointUrl+" value is : " + response.data['value'] +
                ", timestamp is : " + response.data['timestamp'];
            alert(res);
        }).catch((error) => {
            alert("error" + error.toString());
        });
    };
    sendData = async () => {
        const humidityID = '5bdfc9511d8472353149343c';
        const lightID = '5bdfc5db1d84723057db692f';
        const lightColorID = '5bdfc98d1d847234fe29e864';
        const sleeptimeID = '5be171331d8472057999d414';
        const userID = '5bdfc97c1d8472353149348d';
        const temperatureID = '5bdfc9441d84723531493427';
        const onOffID = '5be2bb631d84723ffefdcb97';

        const endpointUrl = 'http://industrial.api.ubidots.com/api/v1.6/variables/';
        const token = 'BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV';
        const withToken = '/values?token='+token;

        const humidityUrl = endpointUrl+humidityID+withToken;
        const lightUrl = endpointUrl+lightID+withToken;
        const lightColorUrl = endpointUrl+lightColorID+withToken;
        const temperatureUrl = endpointUrl+temperatureID+withToken;
        const userIdUrl = endpointUrl+userID+withToken;
        const sleeptimeUrl = endpointUrl+sleeptimeID+withToken;
        const onOffUrl = endpointUrl+onOffID+withToken;

        //Serve.postValue()
        await this.postValue(onOffUrl, this.state.onOff);
        this.delay(300);
        await this.postValue(userIdUrl, this.state.id);
        this.delay(300);
        await this.postValue(humidityUrl, this.state.humidity);
        this.delay(300);
        await this.postValue(lightUrl, this.state.light);
        this.delay(300);
        await this.postValue(lightColorUrl, this.state.lightColor);
        this.delay(300);
        await this.postValue(temperatureUrl, this.state.temperature);
        this.delay(300);
        await this.postValue(sleeptimeUrl, this.state.sleeptime);

    };

    userCreate = () => {
      const endpointUrl = 'http://localhost:5000/user';
      axios.post(endpointUrl,{
          'user_id': this.state.id,
          'user_name': this.state.name,
          'user_humidity': this.state.humidity,
          'user_light': this.state.light,
          'user_lightcolor': this.state.lightColor,
          'user_temperature': this.state.temperature,
          'user_sleeptime': this.state.sleeptime
      }, {
            headers: {
              'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log(res.data);
      }).catch((err) => {
          console.log("err : "+err.toString());
      });
    };

    shutOff = async() => {
        await this.setState({
            onOff: 2,
            id: 0
        });

        const userID = '5bdfc97c1d8472353149348d';
        const onOffID = '5be2bb631d84723ffefdcb97';

        const endpointUrl = 'http://industrial.api.ubidots.com/api/v1.6/variables/';
        const token = 'BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV';
        const withToken = '/values?token='+token;

        const userIdUrl = endpointUrl+userID+withToken;
        const onOffUrl = endpointUrl+onOffID+withToken;

        this.postValue(userIdUrl, this.state.id);
        this.postValue(onOffUrl, this.state.onOff);

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
          <button onClick={this.sendData}>적용하기</button>
          <button onClick={this.userCreate}>회원가입(임시)</button>
          <button onClick={this.shutOff}>전원차단(임시)</button>
        </div>
      </div>
    )
  }
}

export default LandingTemplate;