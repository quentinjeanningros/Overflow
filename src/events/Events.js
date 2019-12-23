import React from 'react';
import './Events.css'
import Topbar from '../assets/Topbar.js';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.pages = ["Home", "Partnership"]
    }

    render() {
        let backgroundText = "paintball".toUpperCase()
        return (
            <div className="background blue-backcolor">
                <div className="square-title white-backcolor"/>
                <h1 className="page-title white-color">Events</h1>
                <h2 id="background-text-event">{backgroundText}</h2>
                <Topbar color="black-color" triggerColor="white-color" pages={this.pages}/>
            </div>
        )
    }
}

export default Events;