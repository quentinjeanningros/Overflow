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
        }
        this.lenght = 5;
        this.partners = props.partners;

        this.eventListener = this.eventListener.bind(this);
        this.forward = this.forward.bind(this);
        this.backward = this.backward.bind(this);
        this.moveTo = this.moveTo.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.eventListener, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.eventListener, false);
    }

    eventListener(event) {
        if (event.keyCode === 39)
            this.forward();
        if (event.keyCode === 37)
            this.backward();
    }

    forward() {
        let id = Math.ceil(this.lenght / 2);
        this.moveTo(id);
    }

    backward() {
        let id = Math.floor(this.lenght / 2) - 1;
        this.moveTo(id);
    }

    moveTo(id) {
        console.log("id: " + id)
    }

    render() {
        let listoDisplay = []
        for (let i = 0; i < this.lenght && i < this.partners.length; ++i) {
            if (i === 2) {
                listoDisplay.push(<PartnerCardFocused name={this.partners[i].name} key={i}/>);
            } else {
                listoDisplay.push(<PartnerCard name={this.partners[i].name} id={i} callback={this.moveTo} key={i}/>);
            }
        }
        return (
            <div className="partner-carrousel--container">
                <CSSTransition in={true} appear={true} timeout={3000} classNames="arrow__fade">
                    <div>
                        <Arrow image={ArrowLeft} class="button partnership--arrow__left partnership--arrow__left__floating" callback={this.backward}/>
                        <Arrow image={ArrowRight} class="button partnership--arrow__right partnership--arrow__right__floating" callback={this.forward}/>
                    </div>
                </CSSTransition>
                {listoDisplay}
            </div>
        )
    }
}

class Arrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
        this.image = props.image;
        this.callback = props.callback;
        this.class = props.class;
        this.toggleHover = this.toggleHover.bind(this)

        this.click = this.click.bind(this)
    }

    click() {
        this.callback()
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    render() {
        let arrowClass
        if (this.state.hover === true)
            arrowClass = " blue-color--fill partnership--arrow__hover"
        else
            arrowClass = " black-color--fill partnership--arrow"
        return (
            <this.image className={this.class + arrowClass}
                onClick={this.click}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}/>
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
        this.callback = props.callback;

        this.click = this.click.bind(this)
    }

    click() {
        this.callback(this.id)
    }

    render() {
        return (
            <div className="partner-card--background black-color--back button" onClick={this.click}>
                <div className="partner-card--square white-color--back"/>
                <h1 className="partner-card--text white-color font-first select-none">{this.name}</h1>
            </div>
        )
    }
}


export {PartnerCarrousel, Partner};