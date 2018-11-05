import React, { Component } from 'react';
import temperatureImg from 'static/images/temperature.png';
import Modal from '../Modal';

class Temperature extends Component {
    state = {
        modal: false,
        type: "온도",
        value: 23
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
                    <img src={temperatureImg} alt="temperature" onClick={this.showModal}/>
                </div>
                {this.state.modal && (
                    <Modal
                        onClose={this.handleToggleModal}
                        type={this.state.type}
                        value={this.state.value}
                    />
                )}
                <div className="valueName">
                    Temperature
                </div>
            </div>
        )
    }
}

export default Temperature;