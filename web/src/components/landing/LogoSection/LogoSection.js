import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from 'static/images/logo.png';
import './LogoSection.scss';

class LogoSection extends Component {

    render() {
        return (
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
        )
    }
}

export default LogoSection;