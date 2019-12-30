import React from 'react';
import './Info.css';
import Contact from '../modules/Contact.js';
import ScrollingText from '../modules/ScrollingText.js';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="background white-color--back" id="info-page">
                <div className="info-sticker-bar">
                    <ScrollingText
                        text="Student's office"
                        background="blue-color--back"
                        color="white-color"
                        font="font-first select-none"
                        interation={6}/>
                </div>
                <div className="info-slogan--container font-first">
                    <h1 className="black-color info-slogan--text">A <span className="info-slogan--title blue-color">Platypus</span></h1>
                    <h1 className="black-color info-slogan--text info-slogan--text__adjustement">to rule them all</h1>
                </div>
                <div className="info-footer">
                    <div className="info-contacts-title--container">
                        <div className="info-contacts-title--square black-color--back"/>
                        <h2 className="info-contacts-title--text black-color font-second" >Contact</h2>
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

export default Info;