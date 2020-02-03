import React from 'react';
import './PartnerCarrousel.css';
import Typing from '../../modules/Typing.js';
import anime from 'animejs/lib/anime.es.js';

const transitionDuration = 450;
const carrousselLength = 9

function moveAnimation(elem, duration, move, ration, callback) {
    let reset = () =>  {
        if (callback !== null)
                callback();
        anime({
            targets: elem.current,
            translateX: 0,
            duration: 0
        });
    }
    anime({
        targets: elem.current,
        translateX: ration * move + "%",
        easing: 'easeInOutQuint',
        duration: duration,
        complete: function() {reset()}
    });
}

class PartnerCarrousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.partners,
        };
        this.partners = props.partners;
        this.move = 0;
        this.clickable = true;

        this.eventListener = this.eventListener.bind(this);
        this.forward = this.forward.bind(this);
        this.backward = this.backward.bind(this);
        this.moveTo = this.moveTo.bind(this);
        this.generateItems = this.generateItems.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.eventListener, false);
        this.props.callback(this.state.list[Math.floor(this.partners.length / 2) + 1]);
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
        let id = Math.ceil(carrousselLength / 2);
        this.moveTo(id);
    }

    backward() {
        let id = Math.floor(carrousselLength / 2) - 1;
        this.moveTo(id);
    }

    moveTo(id) {
        if (this.isMove === true)
            return;
        const {list} = this.state;
        this.move  = Math.floor(carrousselLength / 2) - id
        if (this.move < 0)
            for (let i = 0; i < this.move * -1; ++i)
                list.push(list.shift());
        else if (this.move > 0)
            for (let i = 0; i < this.move; ++i)
                list.unshift(list.pop());
        this.setState({list: list});
        this.isMove = true;
        setTimeout(() => {this.isMove = false}, transitionDuration);
    }

    generateItems(list) {
        let listoDisplay = [];
        for (let i = 0, n = 0; i < carrousselLength; ++i, ++n) {
            if (i === Math.floor(carrousselLength / 2))
                listoDisplay.push(<PartnerCardFocused move={this.move} partner={list[n]} callback={this.props.callback} key={i}/>);
            else
                listoDisplay.push(<PartnerCard move={this.move} partner={list[n]} callback={this.moveTo} clickable={this.clickable} id={i} key={i}/>);
            if (n + 1 >= this.partners.length)
                n = - 1;
        };
        this.move = 0
        return (listoDisplay);
    }

    render() {
        return (
            <div className="partner-carrousel--container">
                {this.generateItems(this.state.list)}
            </div>
        )
    }
}

class PartnerCardFocused extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partner: this.props.partner,
            hover: false
        }
        this.playing = false;
        this.flipped = false;
        this.targetContainer = React.createRef();
        this.targetCard = React.createRef();
        this.targetImage = React.createRef();
        this.targetBackgroundIntern = React.createRef();

        this.click = this.click.bind(this);
        this.toggleHoverEnter = this.toggleHoverEnter.bind(this);
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this);
    }

    updateProps(nextProps) {
        this.setState({partner: nextProps.partner});
        nextProps.callback(nextProps.partner);
    }

    unfocuseAnimationBackgoundExtern() {
        let reset = () => anime({
            targets: this.targetCard.current,
            duration: 0,
            marginTop: "3.8vh",
            height: "50vh",
            width: "35vh",
            borderBottomRightRadius: "5.5vh",
        })
        anime({
            targets: this.targetCard.current,
            easing: 'easeInOutQuint',
            duration: transitionDuration,
            marginTop: "0vh",
            height: "39vh",
            width: "27vh",
            borderBottomRightRadius: "0vh",
            complete: function() {reset()}
        })
    }

    unfocuseAnimationBackgoundIntern() {
        let reset = () => anime({
            targets: this.targetBackgroundIntern.current,
            duration: 0,
            height: "50vh",
            width: "35vh",
            borderBottomRightRadius: "4.5vh",
        })
        anime({
            targets: this.targetBackgroundIntern.current,
            easing: 'easeInOutQuint',
            duration: transitionDuration,
            height: "1.5vh",
            width: "1.5vh",
            borderBottomRightRadius: "0vh",
            complete: function() {reset()}
        })
    }

    flip() {
        this.flipped = !this.flipped;
        anime({
            targets: this.targetCard.current,
            rotateY: '+=180',
            easing: 'easeInOutSine',
            duration: transitionDuration,
        });
    }

    fadeImage() {
        let reset = () => anime({
            targets: this.targetImage.current,
            opacity: 1,
            easing: 'easeInOutSine',
            duration: transitionDuration + 100,
        });
        anime({
            targets: this.targetImage.current,
            opacity: 0,
            easing: 'easeInOutSine',
            duration: transitionDuration / 2,
            complete: function() {reset()}
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.partner === nextProps.partner && nextProps.move === 0)
            return
        let propUpdate = () => {this.updateProps(nextProps)};
        moveAnimation(this.targetContainer, transitionDuration, nextProps.move, 100, propUpdate)
        if (this.flipped === true)
            this.flip()
        this.unfocuseAnimationBackgoundExtern();
        this.unfocuseAnimationBackgoundIntern();
        this.fadeImage()
    }

    click() {
        if(this.playing === true)
            return;
        this.playing = true;
        this.flipped = !this.flipped;
        let callback = () => {this.playing = false;}
        anime({
            targets: this.targetCard.current,
            scale: [{value: 0.90}, {value: 1.25}, {value: 1, delay: 250}],
            rotateY: {value: '+=180', delay: 200},
            easing: 'easeInOutSine',
            duration: 400,
            complete: function() {callback();}
        });
    }

    toggleHoverEnter() {
        this.setState({hover: true})
    }

    toggleHoverLeave() {
        this.setState({hover: false})
    }

    render() {
        let overClass = "";
        if (this.state.hover)
            overClass += " blue-color--back"
        else
            overClass += " black-color--back"
        return (
            <div>
                <div className="partner-card-focused--text--container">
                    <div className="partner-card-focused--square blue-color--back"/>
                    <Typing text={this.state.partner.name} startTime={450} spacetime={80} class="partner-card-focused--text black-color font-first" />
                </div>
                <div ref={this.targetContainer}>
                <div className={"partner-card-focused--background__extern button" + overClass} onClick={this.click} onMouseEnter={this.toggleHoverEnter} onMouseLeave={this.toggleHoverLeave} ref={this.targetCard}>
                    <div className="front">
                        <h1 className="partner-card--text white-color font-first select-none back-hidden">{this.state.partner.name}</h1>
                        <div ref={this.targetBackgroundIntern} className="partner-card-focused--background__intern white-color--back back-hidden">
                            <img ref={this.targetImage} src={this.state.partner.image} className="partner-card-focused--image select-none back-hidden" alt="Focused partenaire poster"/>
                        </div>
                    </div>
                    <div className="back">
                        <p className="partner-card-focused--description white-color font-first back-hidden">{this.state.partner.info}</p>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

class PartnerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partner: this.props.partner,
            hover: false
        }
        this.targetBackgroundExtern = React.createRef();
        this.targetContainer = React.createRef();
        this.targetBackgroundIntern = React.createRef();
        this.targetText = React.createRef();

        this.click = this.click.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
    }

    updateProps(nextProps) {
        this.setState({partner: nextProps.partner});
    }

    focuseAnimationBackgoundExtern() {
        let reset = () => anime({
            targets: this.targetBackgroundExtern.current,
            duration: 0,
            marginTop: "0vh",
            height: "39vh",
            width: "27vh",
            borderBottomRightRadius: "0vh",
        })
        anime({
            targets: this.targetBackgroundExtern.current,
            easing: 'easeInOutQuint',
            duration: transitionDuration,
            marginTop: "3.8vh",
            height: "50vh",
            width: "35vh",
            borderBottomRightRadius: "5.5vh",
            complete: function() {reset()}
        })
    }

    focuseAnimationBackgoundIntern() {
        let reset = () => anime({
            targets: this.targetBackgroundIntern.current,
            duration: 0,
            height: "1.5vh",
            width: "1.5vh",
            borderBottomRightRadius: "0vh",
        })
        anime({
            targets: this.targetBackgroundIntern.current,
            easing: 'easeInOutQuint',
            duration: transitionDuration,
            height: "50vh",
            width: "35vh",
            borderBottomRightRadius: "4.5vh",
            complete: function() {reset()}
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.partner === nextProps.partner && nextProps.move === 0)
            return
        let propUpdate = () => {this.updateProps(nextProps)};
        if (nextProps.move + nextProps.id === Math.floor(carrousselLength / 2)) {
            moveAnimation(this.targetContainer, transitionDuration, nextProps.move, 81, propUpdate)
            this.focuseAnimationBackgoundExtern();
            this.focuseAnimationBackgoundIntern();
        } else
            moveAnimation(this.targetContainer, transitionDuration, nextProps.move, 100, propUpdate)
    }

    click() {
        if (this.props.clickable === true)
            this.props.callback(this.props.id);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    render() {
        let classTitle = "white-color font-first partner-card--text"
        if (this.state.hover)
            classTitle += "--hover"
        return (
            <div ref={this.targetContainer}>
                <div ref={this.targetBackgroundExtern}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this.click}
                className="partner-card--background black-color--back button">
                    <div ref={this.targetBackgroundIntern} className="partner-card--square white-color--back"/>
                    <h1 className={classTitle}>{this.state.partner.name}</h1>
                </div>
            </div>
        )
    }
}


export default PartnerCarrousel;