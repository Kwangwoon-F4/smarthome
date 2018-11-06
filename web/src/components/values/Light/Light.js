import React, { Component } from 'react';
import lightImg from 'static/images/light-bulb.png';
import Modal from '../Modal';

class Light extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            type: "조도",
            value: this.props.value
        };
    }

    sendValue = () => {
        console.log("in light sendValue func : " + this.state.value);
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
                    <img src={lightImg} alt="light" onClick={this.showModal}/>
                </div>
                {this.state.modal && (
                    <Modal
                        onClose={this.handleToggleModal}
                        type={this.state.type}
                        value={this.state.value}
                    />
                )}
                <div className="valueName">
                    Light
                </div>
            </div>
        )
    }
}

export default Light;