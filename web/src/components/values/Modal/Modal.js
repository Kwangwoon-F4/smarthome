import React, { Component } from 'react';
import './Modal.scss';

class Modal extends Component {
    state = {
        type: this.props.type,
        value: this.props.value
    };

    handleChange = e => {
        this.setState({
            type: e.target.name,
            value: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault(); // 페이지 리로딩 방지
        console.log("(before) in modal state : " + this.state.value);
        this.props.onClose(this.state);
        console.log("(after) in modal state : " + this.state.value);
    };


    render = () => {
        const {
            type,
            onClose
        } = this.props;

        return (
            <div className="Modal">
                <div className="dark" onClick={onClose} />
                <div className="modal">
                    <div className="head">
                        <h3>
                            원하시는{`\t`}
                            {type}
                            {`\t`}값을 입력해 주세요
                        </h3>
                        <input className="inputValue"
                            placeholder="1~3"
                            name={type}
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="buttons">
                         <button className="submit" onClick={this.handleSubmit}>
                            확인
                        </button>
                        <button className="close" onClick={onClose}>
                            종료
                        </button>
                    </div>
                </div>
            </div>
        );
    };
}

export default Modal;