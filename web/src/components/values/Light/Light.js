import React, { Component } from 'react';
import lightImg from 'static/images/light-bulb.png';
import Modal from '../Modal';

class Light extends Component {
    state = {
        modal: false,
        type: "조도",
        value: 2
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