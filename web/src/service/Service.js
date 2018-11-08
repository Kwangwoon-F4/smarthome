import React, { Component } from 'react';
import axios from 'axios';


class Service extends Component {
    /*const humidityID = '5bdfc9511d8472353149343c';
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
    const onOffUrl = endpointUrl+onOffID+withToken;*/
    state = {
        humidityUrl: 'http://industrial.api.ubidots.com/api/v1.6/variables/5bdfc9511d8472353149343c/values?token=BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV',
        lightUrl: 'http://industrial.api.ubidots.com/api/v1.6/variables/5bdfc5db1d84723057db692f/values?token=BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV',
        lightColorUrl: 'http://industrial.api.ubidots.com/api/v1.6/variables/5bdfc98d1d847234fe29e864/values?token=BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV',
        sleeptimeUrl: 'http://industrial.api.ubidots.com/api/v1.6/variables/5be171331d8472057999d414/values?token=BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV',
        userIdUrl: 'http://industrial.api.ubidots.com/api/v1.6/variables/5bdfc97c1d8472353149348d/values?token=BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV',
        temperatureUrl: 'http://industrial.api.ubidots.com/api/v1.6/variables/5bdfc9441d84723531493427/values?token=BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV',
        onOffUrl: 'http://industrial.api.ubidots.com/api/v1.6/variables/5be2bb631d84723ffefdcb97/values?token=BBFF-PF7xbbrjhnRpBGjLioQXEhGPWlLtiV'
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
}
