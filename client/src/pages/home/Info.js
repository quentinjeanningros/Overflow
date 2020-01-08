import React from 'react';
import './Info.css';
import Contact from '../../modules/Contact.js';
import ScrollingText from '../../modules/ScrollingText.js';
import config from "../../config";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            contacts: []
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch(config.API_URL + "/contacts", {method: "GET"})
            .then(response => response.json())
            .then(result => {
                this.setState({loading: false, error: null, contacts: result});
            })
            .catch(e => {
                this.setState({loading: false, error: e, contacts: []});
            });
    }

    render() {
        let contactDisplay = []
        for (let i = 0, count = 0; i < this.state.contacts.length;) {
            let line = [];
            for (let n = 0; n < 4 && i < this.state.contacts.length; ++n, ++i)
                line.push(<Contact role={this.state.contacts[i].title} mail={this.state.contacts[i].email} key={n}/>);
            contactDisplay.push(<div className="info-contacts-line" key={count++}>{line}</div>);
        }
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
                    {contactDisplay}
                </div>
            </div>
        )
    }
}

export default Info;