import React from 'react';
import {PartnerCarrousel, Partner}  from './PartnerCarrousel.js';
import {NavigationBar, Link}  from '../assets/NavigationBar.js';
import './Partnership.css'

class Partnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.linkedPages = [new Link("Home", "/home"),
            new Link("Events", "events")]
        this.partners = [new Partner("Barberousse", true, true, true, ""),
            new Partner("Flam's", true, true, true, ""),
            new Partner("McDonald's", true, true, true, ""),
            new Partner("Chez Victor", true, true, true, ""),
            new Partner("Le Phonographe", true, true, true, "")]
    }

    render() {
        return (
            <div className="background white-color--back">
                <div className="square-title black-color--back"/>
                <h1 className="page-title black-color select-none">Partnership</h1>
                <NavigationBar color="black-color" triggerColor="blue-color" links={this.linkedPages}/>
                <PartnerCarrousel partners={this.partners}/>
            </div>
        )
    }
}

export default Partnership;