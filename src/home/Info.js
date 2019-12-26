import React from 'react';
import './Info.css';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="background white-color--back">
                <div className="info-slogan--container">
                    <h1 className="black-color info-slogan--text">A <span className="info-slogan--title blue-color">Platypus</span></h1>
                    <h1 className="black-color info-slogan--text info-slogan--text__adjustement">to rule them all</h1>
                </div>
                <div className="info-footer">
                    <div className="info-contacts-title--container">
                        <div className="info-contacts-title--square black-color--back"/>
                        <h2 className="info-contacts-title--text black-color" >Contact</h2>
                    </div>
                    <div className="info-contacts">
                        <Contact role="Director" mail="jules.klakosz@epitech.eu"/>
                        <Contact role="Second" mail="kevin.spegt@epitech.eu"/>
                        <Contact role="Designer" mail="quentin.jeanningros@epitech.eu"/>
                        <Contact role="Treasurer" mail="colin.cleary@epitech.eu"/>
                    </div>
                </div>
            </div>
        )
    }
}

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
        let classRole = "info-role"
        let classMail = "info-mail"
        if (this.state.hover) {
            classRole += "--hover black-color"
            classMail += "--hover blue-color"
        }
        else {
            classRole += " blue-color"
            classMail += " black-color"
        }
        return (
            <div onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <h3 className={classRole}>{this.role}</h3>
                <h4 className={classMail}>{this.mail}</h4>
            </div>
        )
    }
}

export default Info;