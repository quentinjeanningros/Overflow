import React from 'react';
import './PartnerCarrousel.css'

class Partner {
    constructor(name, epitech, iseg, eart, image) {
        this.name = name
        this.epitech = epitech
        this.iseg = iseg
        this.eart = eart
        this.image = image
    }
}

class PartnerCarrousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.partners = props.partners
    }

    render() {
        let listoDisplay = []
        for (let i = 0; i < 5 && i < this.partners.length; ++i) {
            if (i === 2) {
                listoDisplay.push(<PartnerCardFocused name={this.partners[i].name} key={i}/>);
            } else {
                listoDisplay.push(<PartnerCard name={this.partners[i].name} key={i}/>);
            }
        }
        return (
            <div className="partner-carrousel--container">
                {listoDisplay}
            </div>
        )
    }
}

class PartnerCardFocused extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.name = props.name
    }

    render() {
        return (
            <div>
                <div className="partner-card-focused--text--container">
                    <div className="partner-card-focused--square blue-color--back"/>
                    <h1 className="partner-card-focused--text black-color font-first select-none">{this.name}</h1>
                </div>
                <div className="partner-card-focused--background white-color--back">
                </div>
            </div>
        )
    }
}

class PartnerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.name = props.name
    }

    render() {
        return (
            <div className="partner-card--background black-color--back">
                <div className="partner-card--square white-color--back"/>
                <h1 className="partner-card--text white-color font-first select-none">{this.name}</h1>
            </div>
        )
    }
}


export {PartnerCarrousel, Partner};