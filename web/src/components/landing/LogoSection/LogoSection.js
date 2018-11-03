import React, { Component } from 'react';
import logo from 'static/images/logo.png';
import './LogoSection.scss';

class LogoSection extends Component {
    render() {
        return (
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
        )
    }
}

export default LogoSection;