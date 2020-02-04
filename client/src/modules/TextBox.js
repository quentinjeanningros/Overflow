import React from 'react';
import './TextBox.css'

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleFocus = this.toggleFocus.bind(this);
    }

    handleChange(event) {
        this.props.callback(event.target.value);
    }

    toggleFocus() {
        this.setState({focus: !this.state.focus})
    }

    render() {
        let classInput = "font-first  text-box"
        if (this.state.focus)
            classInput += "__focus black-color white-color--back"
        else
            classInput += " white-color black-color--back blue-color--border"
        return (
            <label className={this.props.class}>
                <h3 className="text-box--label font-second white-color">{this.props.label}</h3>
                <input onFocus={this.toggleFocus}
                    onBlur={this.toggleFocus}
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.handleChange}
                    className={classInput}/>
            </label>
        );
    }
}

export default TextBox;