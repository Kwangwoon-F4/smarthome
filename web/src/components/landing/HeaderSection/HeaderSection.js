import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import logo from 'static/images/whitelogo.png';
import kwangQ from 'static/images/kwangQ2.png'
import './HeaderSection.scss';


class HeaderSection extends Component{
    render() {
        return (
            <div className="header">
                <div className="logoDiv">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <img src={kwangQ} alt="kwangQ"/>
                    </Link>
                </div>
            </div>
        )
    }
}

export default HeaderSection;