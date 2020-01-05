import React from 'react';
import './PartnerCarrousel.css';
import {ArrowLeft, ArrowRight} from '../assets/svg-react/index.js';
import {CSSTransition} from 'react-transition-group';
import Typing from '../modules/Typing.js';
import anime from 'animejs/lib/anime.es.js';

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
            list: props.partners,
        };
        this.length = this.props.length;
        this.partners = props.partners;
        this.setter = props.setter;
        this.move = 0;

        this.eventListener = this.eventListener.bind(this);
        this.forward = this.forward.bind(this);
        this.backward = this.backward.bind(this);
        this.moveTo = this.moveTo.bind(this);
        this.generateItems = this.generateItems.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.eventListener, false);
        this.setter(this.state.list[Math.floor(this.partners.length / 2)]);
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
        let id = Math.ceil(this.length / 2);
        this.moveTo(id);
    }

    backward() {
        let id = Math.floor(this.length / 2) - 1;
        this.moveTo(id);
    }

    moveTo(id) {
        const {list} = this.state;
        this.move = Math.floor(this.length / 2) - id;
        if (this.move < 0)
            for (let i = 0; i < this.move * -1; ++i)
                list.push(list.shift())
        else if (this.move > 0)
            for (let i = 0; i < this.move; ++i)
                list.unshift(list.pop())
        this.setter(this.state.list[Math.floor(this.state.list.length / 2)]);
    }

    generateItems() {
        let listoDisplay = [];
        for (let i = 0, n = 0; i < this.length; ++i, ++n) {
            if (i === Math.floor(this.length / 2))
                listoDisplay.push(<PartnerCardFocused name={this.state.list[n].name} key={i}/>);
            else
                listoDisplay.push(<PartnerCard name={this.state.list[n].name} id={n} move={this.move} callback={this.moveTo} key={i}/>);
            if (n + 1 >= this.partners.length)
                n = - 1;
        };
        return (listoDisplay);
    }

    render() {
        return (
            <div className="partner-carrousel--container">
                {this.generateItems()}
                <CSSTransition in={true} appear={true} timeout={3000} classNames="arrow__fade">
                    <div>
                        <Arrow image={ArrowLeft} class="button partnership--arrow__left partnership--arrow__left__floating" callback={this.backward}/>
                        <Arrow image={ArrowRight} class="button partnership--arrow__right partnership--arrow__right__floating" callback={this.forward}/>
                    </div>
                </CSSTransition>
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
            arrowClass = " white-color--fill partnership--arrow"
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
    }

    render() {
        return (
            <div className="partner-card-focused--container">
                <div className="partner-card-focused--text--container">
                    <div className="partner-card-focused--square blue-color--back"/>
                    <Typing text={this.props.name} startTime={500} spacetime={80} class="partner-card-focused--text black-color font-first select-none " />
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
        this.card = null;
        this.id = props.id;
        this.callback = props.callback;
        this.target = React.createRef();

        this.click = this.click.bind(this);
    }

    click() {
        this.callback(this.id)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.move === 0)
            return;
        anime({
            targets: this.target,
            translateX: 100 * nextProps.move  + "%",
            easing: 'easeOutElastic',
            duration: 1000,
            complete: function() {
                anime({
                    targets: this.target,
                    translateX: 0,
                    easing: 'easeOutElastic',
                    duration: 0
                })
            }
        });
    }
    
    render() {
        return (
            <div setTarget={this.setTarget}>
                <div className="partner-card--background black-color--back button" onClick={this.click}>
                    <div className="partner-card--square white-color--back"/>
                    <h1 className="partner-card--text white-color font-first select-none">{this.props.name}</h1>
                </div>
            </div>
        )
    }
}


export {PartnerCarrousel, Partner};