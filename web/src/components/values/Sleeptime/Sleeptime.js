import React, { Component } from 'react';
import sleepImg from 'static/images/clock.png';
import Modal from '../Modal';

class Sleeptime extends Component {
    state = {
        modal: false,
        type: "취침 시간",
        value: "21:00"
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