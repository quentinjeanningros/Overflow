import React from 'react';
import './Contact.css';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
        this.role = props.role;
        this.mail = props.mail;

        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    render() {
        let classRole = "font-first contact-title"
        let classMail = "font-second contact-info"
        if (this.state.hover) {
            classRole += "--hover black-color"
            classMail += "--hover blue-color"
        }
        else {
            classRole += " blue-color"
            classMail += " black-color"
        }
        return (
            <div onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className="contact--container">
                <h3 className={classRole}>{this.role}</h3>
                <h4 className={classMail}>{this.mail}</h4>
            </div>
        )
    }
}

export default Contact;