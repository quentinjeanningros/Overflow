import React from 'react';
import './Events.css';
import {NavigationBar, Link} from '../../modules/NavigationBar.js';
import config from "../../config";
import Typing from '../../modules/Typing.js';
import EventCarrousel from './EventCarrousel.js';

//TODELET
import affiche from '../../assets/Artboard1.png'
import killingthename from '../../assets/Killing_In_The_Name_loop.mp3'

class Event {
    constructor(name, image, price, location, date, audio) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.location = location;
        this.date = date;
        this.audio = audio;
    }
}

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: new Event("paintball", affiche, 15, "https://www.google.fr/maps/place/4+Rue+du+Dôme,+67000+Strasbourg", "21/10/2020", killingthename),
            loading: false,
            error: null,
            events: []
        };

        this.list = [new Event("paintball", affiche, 15, "https://www.google.fr/maps/place/4+Rue+du+Dôme,+67000+Strasbourg", "1 Sep. 2019", killingthename),
        new Event("Musique", affiche, 30, "https://www.google.fr/maps/place/4+Rue+du+Dôme,+67000+Strasbourg", "1 Sep. 2019", killingthename),
        new Event("Travis Scoot", affiche, 1, "https://www.google.fr/maps/place/4+Rue+du+Dôme,+67000+Strasbourg", "1 Sep. 2019", killingthename),
        new Event("lol", affiche, 10, "https://www.google.fr/maps/place/4+Rue+du+Dôme,+67000+Strasbourg", "1 Sep. 2019", killingthename),
        new Event("disco", affiche, 50, "https://www.google.fr/maps/place/4+Rue+du+Dôme,+67000+Strasbourg", "1 Sep. 2019", killingthename)];

        this.linkedPages = [new Link("Home", "/home"), new Link("Discounts", "/discounts")]
        this.setFocused = this.setFocused.bind(this);
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

    setFocused(event) {
        if (this.state.focused !== event)
            this.setState({focused: event})
    }

    render() {
        return (
            <div id="event-page" className="background blue-color--back">
                <div className="square-title white-color--back"/>
                <h1 className="page-title white-color select-none font-second">Events</h1>
                <div className="event--focused-text--container">
                    <Typing text={this.state.focused.name.toUpperCase()} startTime={500} spacetime={80} class="event--focused-text black-color font-first"/>
                </div>
                <NavigationBar color="black-color" triggerColor="white-color" links={this.linkedPages}/>
                <div className="event--carrousel">
                    <EventCarrousel list={this.list} callback={this.setFocused}/>
                </div>
            </div>
        )
    }
}

export default Events;