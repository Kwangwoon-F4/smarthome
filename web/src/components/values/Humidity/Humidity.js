import React, { Component } from 'react';
import humidityImg from 'static/images/humidity.png';
import Modal from '../Modal';
import './Humidity.scss';


class Humidity extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            type: "습도",
            value : this.props.value,
        };
        console.log("constructor : " + this.state.value);
    }

    /*componentDidMount() {
        console.log("in humidity component: " + this.state.value);
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.value !== prevState.value){
            return { value: nextProps.value };
        }
        return null;
    }*/

    sendValue = () => {
        console.log("in Humidity sendValue func : " + this.state.value);
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