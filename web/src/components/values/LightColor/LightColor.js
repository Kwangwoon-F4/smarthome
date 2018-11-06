import React, { Component } from 'react';
import rgbImg from 'static/images/rgb.png';
import Modal from '../Modal';

class LightColor extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            type: "빛 색깔",
            value: this.props.value
        };
    }

    sendValue = () => {
        console.log("in lightColor sendValue func : " + this.state.value);
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