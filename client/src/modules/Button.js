import React from 'react';
import './Button.css'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
        this.callback = this.callback.bind(this)
        this.toggleHoverEnter = this.toggleHoverEnter.bind(this)
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this)

    }

    callback(e) {
        e.preventDefault()
        if (this.props.callback)
            this.props.callback()
    }

    toggleHoverEnter() {
        this.setState({hover: true});
    }

    toggleHoverLeave() {
        this.setState({hover: false});
    }

    render() {
        let classButton = "white-color font-first custom-button__above"
        if (this.state.hover === true)
            classButton += "--hover"
        else if (this.props.lock === true)
            classButton += "--none"
        return (
            <button className={this.props.class + " button"}
                onFocus={this.toggleHoverEnter}
                onBlur={this.toggleHoverLeave}
                onMouseEnter={this.toggleHoverEnter}
                onMouseLeave={this.toggleHoverLeave}
                onClick={this.callback}>
                <div className={classButton}>
                    {this.props.text}
                </div>
                <div className="blue-color font-first  custom-button">
                    {this.props.text}
                </div>
            </button>
        );
    }
}

export default Button;