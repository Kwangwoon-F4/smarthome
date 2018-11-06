import React, { Component } from 'react';
import sleepImg from 'static/images/clock.png';
import Modal from '../Modal';

class Sleeptime extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            type: "취침 시간",
            value: this.props.value
        };
    };

    sendValue = () => {
        console.log("in sleeptime sendValue func : " + this.state.value);
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
                    <img src={sleepImg} alt="sleep-time" onClick={this.showModal}/>
                </div>
                {this.state.modal && (
                    <Modal
                        onClose={this.handleToggleModal}
                        type={this.state.type}
                        value={this.state.value}
                    />
                )}
                <div className="valueName">
                    Sleep Time
                </div>
            </div>
        )
    }
}

export default Sleeptime;