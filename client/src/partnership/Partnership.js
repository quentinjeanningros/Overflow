import React from 'react';
import {PartnerCarrousel, Partner}  from './PartnerCarrousel.js';
import {NavigationBar, Link}  from '../modules/NavigationBar.js';
import './Partnership.css'
import Typing from '../modules/Typing.js';
import config from "../config";

class Partnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: new Partner("", false, false, false, ""),
            loading: false,
            error: null,
            partners: [],
        };
        this.linkedPages = [new Link("Home", "/home"), new Link("Events", "events")];

        this.partners = [new Partner("Barberousse", true, true, true, ""),
            new Partner("Flam's", true, false, false, ""),
            new Partner("McDonald's", true, false, true, ""),
            new Partner("Chez Victor", true, true, true, ""),
            new Partner("Nooï", true, false, false, ""),
            new Partner("Le Phonographe", true, true, true, "")];

        this.setFocused = this.setFocused.bind(this);
    }

    setFocused(partner) {
        this.setState({focused: partner})
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch(config.API_URL + "/partnerships", {method: "GET"})
            .then(response => response.json())
            .then(result => {
                this.setState({loading: false, error: null, partners: result});
            })
            .catch(e => {
                this.setState({loading: false, error: e, partners: []});
            });
    }

    render() {
        return (
            <div id="partnership-page" className="background white-color--back">
                <div className="square-title black-color--back"/>
                <h1 className="page-title font-second black-color select-none">Partnership</h1>
                <NavigationBar color="black-color" triggerColor="blue-color" links={this.linkedPages}/>
                <div className="partnership--carrousel">
                    <PartnerCarrousel length={7} loading={this.state.loading} error={this.state.error} partners={this.partners /* TODO replace by this.state.partners*/} setter={this.setFocused}/>
                </div>
                <div className="focused-text--container">
                    <Typing text={this.state.focused.name.toUpperCase()} startTime={500} spacetime={80} class="focused-text black-color font-first select-none"/>
                </div>
            </div>
        )
    }
}

export default Partnership;