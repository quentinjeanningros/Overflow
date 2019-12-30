import React from 'react';
import './PartnerCarrousel.css'
import Typing from 'react-typing-animation';
import {ArrowLeft, ArrowRight} from '../assets/svg-react/index.js';
import {CSSTransition} from 'react-transition-group';


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
            hoverLeft: false,
            hoverRight: false,
        }
        this.partners = props.partners


        this.toggleHoverLeft = this.toggleHoverLeft.bind(this);
        this.toggleHoverRight = this.toggleHoverRight.bind(this);
        this.forward = this.forward.bind(this)
        this.backward = this.backward.bind(this)
    }

    toggleHoverLeft() {
        this.setState({hoverLeft: !this.state.hoverLeft})
    }

    toggleHoverRight() {
        this.setState({hoverRight: !this.state.hoverRight})
    }

    forward() {
        console.log("avant")
    }

    backward() {
        console.log("arriere")
    }

    render() {
        let arrowLeftClass
        let arrowRightClass
        if (this.state.hoverLeft === true)
            arrowLeftClass = "blue-color--fill partnership--arrow__hover"
        else
            arrowLeftClass = "black-color--fill partnership--arrow"
        if (this.state.hoverRight === true)
            arrowRightClass = "blue-color--fill partnership--arrow__hover"
        else
            arrowRightClass = "black-color--fill partnership--arrow"
        let listoDisplay = []
        for (let i = 0; i < 5 && i < this.partners.length; ++i) {
            if (i === 2) {
                listoDisplay.push(<PartnerCardFocused name={this.partners[i].name} key={i}/>);
            } else {
                listoDisplay.push(<PartnerCard name={this.partners[i].name} id={i} key={i}/>);
            }
        }
        return (
            <div className="partner-carrousel--container">
                <CSSTransition in={true} appear={true} timeout={3000} classNames="arrow__fade">
                    <div>
                        <ArrowLeft className={"partnership--arrow__left partnership--arrow__left__floating " + arrowLeftClass}
                            onClick={this.backward}
                            onMouseEnter={this.toggleHoverLeft}
                            onMouseLeave={this.toggleHoverLeft}/>
                        <ArrowRight className={"partnership--arrow__right partnership--arrow__right__floating " + arrowRightClass}
                            onClick={this.forward}
                            onMouseEnter={this.toggleHoverRight}
                            onMouseLeave={this.toggleHoverRight}/>
                    </div>
                </CSSTransition>
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
        this.name = props.name;
    }

    render() {
        return (
            <div>
                <div className="partner-card-focused--text--container">
                    <div className="partner-card-focused--square blue-color--back"/>
                    <Typing hideCursor={true} speed={50} startDelay={500}>
                        <h1 className="partner-card-focused--text black-color font-first select-none">{this.name}</h1>
                    </Typing>
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
        this.id = props.id
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