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
        let i = 0;
        let listoDisplay = []
        this.partners.forEach(element => {
            listoDisplay.push(<PartnerCard
                name={element.name}
                key={i}/>);
            ++i
        });
        return (
            <div className="partner-carrousel__container">
                {listoDisplay}
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
            <div className="partner-card__background">
            </div>
        )
    }
}


export {PartnerCarrousel, Partner};