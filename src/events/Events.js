import React from 'react';
import './Events.css'
import {NavigationBar, Link} from '../modules/NavigationBar.js';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.linkedPages = [new Link("Home", "/home"), new Link("Partnership", "Partnership")]
    }

    render() {
        let backgroundText = "paintball".toUpperCase()
        return (
            <div className="background blue-color--back">
                <div className="square-title white-color--back"/>
                <h1 className="page-title white-color select-none">Events</h1>
                <h2 id="background-text-event">{backgroundText}</h2>
                <NavigationBar color="black-color" triggerColor="white-color" links={this.linkedPages}/>
            </div>
        )
    }
}

export default Events;