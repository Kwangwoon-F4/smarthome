import React, { Component } from 'react';
import rgbImg from 'static/images/rgb.png';
import Modal from '../Modal';

class LightColor extends Component {
    state = {
        modal: false,
        type: "빛 색깔",
        value: "#ffffff"
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
                    <img src={rgbImg} alt="light-color" onClick={this.showModal}/>
                </div>
                {this.state.modal && (
                    <Modal
                        onClose={this.handleToggleModal}
                        type={this.state.type}
                        value={this.state.value}
                    />
                )}
                <div className="valueName">
                    Light Color
                </div>
            </div>
        )
    }
}

export default LightColor;