import React, { Component } from 'react';
import './Username.scss';


class Username extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }

    handleChange = async (event) => {
        await this.setState({name: event.target.value});
        this.sendValue();
    };

    sendValue = () => {
        this.props.handleName(this.state);
    };

    render() {
        return(
            <div className='usernameSection'>
                <div className='userInput'>
                    <input type="text"
                           value={this.state.name}
                           name="username"
                           onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

export default Username;