import React, { Component } from 'react';
import axios from 'axios';
import './LandingTemplate.scss';

import LogoSection from '../LogoSection';
import ValueSection from '../ValueSection';
import HeaderSection from "../HeaderSection";
import SignupBtn from 'components/signup/SignupBtn';
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

    /*async ComponentDidMount ()  {
        this.setState({

        })
    }*/

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
            /*let res = endpointUrl+" value is : " + response.data['value'] +
                ", timestamp is : " + response.data['timestamp'];
            alert(res);*/
        }).catch((error) => {
            alert("오류 : " + error.toString());
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
        alert("잠시 기다려주세요");
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
        alert("적용이 완료되었습니다! " +
            "\n센서 작동까지 시간이 조금 소요될 수 있습니다." +
            "\n\n희망 습도: " + this.state.humidity +
            "\n희망 조도: " + this.state.light +
            "\n조명 색깔: " + this.state.lightColor +
            "\n희망 온도: " + this.state.temperature +
            "\n취침 시간: " + this.state.temperature);
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
        alert('전원이 차단되었습니다.')

    };

  render() {
    let state = this.state;
    return (
      <div className="landing">
        <div className="landingHeader">
          <HeaderSection/>
          <div className="buttons">
            <button onClick={this.shutOff}>전원차단</button>
            <SignupBtn/>
          </div>
        </div>
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
          {/*<button onClick={this.shutOff}>전원차단</button>*/}
        </div>
      </div>
    )
  }
}

export default LandingTemplate;