import React from 'react';
import './Events.css';
import {NavigationBar, Link} from '../../modules/NavigationBar.js';
import config from "../../config";

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            events: []
        };
        this.linkedPages = [new Link("Home", "/home"), new Link("Partnership", "Partnership")]
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch(config.API_URL + "/events", {method: "GET"})
            .then(response => response.json())
            .then(result => {
                this.setState({loading: false, error: null, events: result});
            })
            .catch(e => {
                this.setState({loading: false, error: e, events: []});
            });
    }

    render() {
        let backgroundText = "paintball".toUpperCase();
        return (
            <div className="background blue-color--back">
                <div className="square-title white-color--back"/>
                <h1 className="page-title white-color select-none font-second">Events</h1>
                    <h2 id="background-text-event" className="font-first">{backgroundText}</h2>
                <NavigationBar color="black-color" triggerColor="white-color" links={this.linkedPages}/>
            </div>
        )
    }
}

export default Events;