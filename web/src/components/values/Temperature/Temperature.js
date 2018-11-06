import React, { Component } from 'react';
import temperatureImg from 'static/images/temperature.png';
import Modal from '../Modal';

class Temperature extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            type: "온도",
            value: this.props.value
        };
    }

    sendValue = () => {
        console.log("in temperature sendValue func : " + this.state.value);
        this.props.onUpdate(this.state);
    };

    handleToggleModal = async (data) => {
        await this.setState({
            modal: false,
            type: data.type,
            value: data.value
        });
        this.sendValue();
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