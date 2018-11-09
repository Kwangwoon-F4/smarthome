import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './SignupTemplate.scss';

import HeaderSection from 'components/landing/HeaderSection';
import LogoSection from 'components/landing/LogoSection';
import ValueSection from 'components/landing/ValueSection';
import Username from 'components/values/Username';


class SignupTemplate extends Component {
    state = {
        id: 100,
        name: 'no-name',
        humidity: 2,
        light: 2,
        lightColor: 255255255,    // #ffffff
        temperature: 23,
        sleeptime: 2100,           // 21:00
        onOff: 1,
        signup: true
    };

    handleName = async (data) => {
        await this.setState({
            name: data.name
        });
        console.log("name : " + this.state.name);
    };

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

    userCreate = () => {
        const endpointUrl = 'http://1114bebc.ngrok.io/user';  // 주소 바꿔줘야 함.
        axios.post(endpointUrl,{
            'user_id': -1,  // 신규가입유저
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
            alert("회원가입이 완료되었습니다.");
            console.log(res.data);
        }).catch((err) => {
            console.log("err : "+err.toString());
        });
    };

    render() {
        let state = this.state;
        return (
            <div className="landing">
                <HeaderSection/>
                <LogoSection/>
                <Username
                    name={state.name}
                    handleName={this.handleName}
                />
                <ValueSection
                    humidity={state.humidity}
                    light={state.light}
                    lightColor={state.lightColor}
                    temperature={state.temperature}
                    sleeptime={state.sleeptime}
                    handleUpdate={this.handleUpdate}
                />
                <div className="sendBtn">
                    <Link to='/'>
                        <button onClick={this.userCreate}>입력완료</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default SignupTemplate;