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
        if (this.props.callback && !this.props.lock)
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
        if (this.state.hover === true && !this.props.lock)
            classButton += "--hover"
        else if (this.props.lock === true)
            classButton += "--none"

        let display = null
        const button =  <button style={{fontSize: this.props.fontSize ? this.props.fontSize : "3vh"}} className={this.props.class + " button"}
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
        if (this.props.intext)
            display = button
        else
            display = <div>{button}</div>
        return (
            display
        );
    }
}

export default Button;