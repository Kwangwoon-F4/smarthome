import React, { Component } from 'react';
import axios from 'axios';
import './LandingTemplate.scss';

import LogoSection from '../LogoSection';
import ValueSection from '../ValueSection';

class LandingTemplate extends Component {
    state = {
      id: 0,
      humidity: 2,
      light: 2,
      lightColor: 255,    // #ffffff
      temperature: 23,
      sleeptime: 2100           // 21:00
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
    sendData = async (datas) => {
        const humidityID = '5bdfc9511d8472353149343c';
        const lightID = '5bdfc5db1d84723057db692f';
        const lightColorID = '5bdfc98d1d847234fe29e864';
        const sleeptimeID = '5be171331d8472057999d414';
        const userID = '5bdfc97c1d8472353149348d';
        const temperatureID = '5bdfc9441d84723531493427';

        const endpointUrl = 'http://industrial.api.ubidots.com/api/v1.6/';
        const variableUrl = 'variables/';
        const datasourceUrl = 'datasources/5bdfc5da1d8472316cd7270e/';
        const token = 'BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV';
        const withToken = '/values?token='+token;

        setTimeout(axios.post(endpointUrl+variableUrl+humidityID+withToken,{
            value: this.state.humidity
        }).then((response) => {
            let res = "humidity value is : " + response.data['value'] +
                ", timestamp is : " + response.data['timestamp'];
            console.log(response.data);
            alert(res);
        }).catch((error) => {
            alert("error" + error.toString());
        }),1000);

        setTimeout(axios.post(endpointUrl+variableUrl+lightID+withToken,{
            value: this.state.light
        }).then((response) => {
            let res = "light value is : " + response.data['value'] +
                ", timestamp is : " + response.data['timestamp'];
            console.log(response.data);
            alert(res);
        }).catch((error) => {
            alert("error" + error.toString());
        }),3000);

        setTimeout(axios.post(endpointUrl+variableUrl+lightColorID+withToken,{
            value: this.state.lightColor
        }).then((response) => {
            let res = "lightColor value is : " + response.data['value'] +
                ", timestamp is : " + response.data['timestamp'];
            console.log(response.data);
            alert(res);
        }).catch((error) => {
            alert("error" + error.toString());
        }),6000);

        setTimeout(axios.post(endpointUrl+variableUrl+sleeptimeID+withToken,{
            value: this.state.sleeptime
        }).then((response) => {
            let res = "sleeptime value is : " + response.data['value'] +
                ", timestamp is : " + response.data['timestamp'];
            console.log(response.data);
            alert(res);
        }).catch((error) => {
            alert("error" + error.toString());
        }),9000);

        setTimeout(axios.post(endpointUrl+variableUrl+userID+withToken,{
            value: this.state.id
        }).then((response) => {
            let res = "userId value is : " + response.data['value'] +
                ", timestamp is : " + response.data['timestamp'];
            console.log(response.data);
            alert(res);
        }).catch((error) => {
            alert("error" + error.toString());
        }),12000);

        setTimeout(axios.post(endpointUrl+variableUrl+temperatureID+withToken,{
            value: this.state.temperature
        }).then((response) => {
            let res = "temperature value is : " + response.data['value'] +
                ", timestamp is : " + response.data['timestamp'];
            console.log(response.data);
            alert(res);
        }).catch((error) => {
            alert("error" + error.toString());
        }),15000);

        /*axios.get(endpointUrl+datasourceUrl+'variables'+withToken)
            .then((response) => {
                let returnData = response.data.results;
                returnData.forEach((item, index, array) => {
                    console.log(item['name']);
                    //alert(item['name']);
                });
            })
            .catch((error) => {
                alert("error");
            });*/
       // return alert(axios.get(endpointUrl+datasourceUrl+'variables'+withToken));
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
        </div>
      </div>
    )
  }
}

export default LandingTemplate;