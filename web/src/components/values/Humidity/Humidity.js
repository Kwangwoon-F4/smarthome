import React, { Component } from 'react';
import humidityImg from 'static/images/humidity.png';
import Modal from '../Modal';
import './Humidity.scss';


class Humidity extends Component {
    state = {
        modal: false,
        type: "습도",
        value : 2
    };

    handleToggleModal = (
        data
    ) => {
        this.setState({
            modal: false,
            data
        });
        console.log(this.state.type + " : "  + data.value);
    };

    showModal = () => {
        this.setState({
            modal: true
        });
    };

    render() {
        return (
            <div className="valueContainer">
                <div className="valueImg">
                    <img src={humidityImg} alt="humidity" onClick={this.showModal}/>
                </div>
                {this.state.modal && (
                    <Modal
                        onClose={this.handleToggleModal}
                        type={this.state.type}
                        value={this.state.value}
                    />
                )}
                <div className="valueName">
                    Humidity
                </div>
            </div>
        )
    }
}

export default Humidity;