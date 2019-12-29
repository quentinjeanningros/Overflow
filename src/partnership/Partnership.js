import React from 'react';
import {PartnerCarrousel, Partner}  from './PartnerCarrousel.js';
import {NavigationBar, Link}  from '../modules/NavigationBar.js';
import './Partnership.css'

class Partnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.linkedPages = [new Link("Home", "/home"),
            new Link("Events", "events")]
        this.partners = [new Partner("Barberousse", true, true, true, ""),
            new Partner("Flam's", true, false, false, ""),
            new Partner("McDonald's", true, false, true, ""),
            new Partner("Chez Victor", true, true, true, ""),
            new Partner("Nooï", true, false, false, ""),
            new Partner("Le Phonographe", true, true, true, "")]
    }

    render() {
        return (
            <div id="partnership-page" className="background white-color--back">
                <div className="square-title black-color--back"/>
                <h1 className="page-title font-second black-color select-none">Partnership</h1>
                <NavigationBar color="black-color" triggerColor="blue-color" links={this.linkedPages}/>
                <div className="partnership--carrousel">
                    <PartnerCarrousel partners={this.partners}/>
                </div>
            </div>
        )
    }
}

export default Partnership;