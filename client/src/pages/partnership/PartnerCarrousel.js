import React from 'react';
import './PartnerCarrousel.css';
import Typing from '../../modules/Typing.js';
import anime from 'animejs/lib/anime.es.js';

function moveAnimation(elem, move, ration, callback) {
    anime({
        targets: elem.current,
        translateX: ration * move + "%",
        easing: 'easeInOutQuint',
        duration: 450,
        complete: function(anim) {
            if (callback !== null)
                callback();
            anime({
                targets: anim.animations[0].animatable.target,
                translateX: 0,
                duration: 0
            });
        }
    });
}

class Partner {
    constructor(name, epitech, iseg, eart, image, description) {
        this.name = name;
        this.epitech = epitech;
        this.iseg = iseg;
        this.eart = eart;
        this.image = image;
        this.description = description;
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
        this.setter(this.state.list[Math.floor(this.partners.length / 2) + 1]);
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
        this.move  = Math.floor(this.length / 2) - id
        if (this.move < 0)
            for (let i = 0; i < this.move * -1; ++i)
                list.push(list.shift());
        else if (this.move > 0)
            for (let i = 0; i < this.move; ++i)
                list.unshift(list.pop());
        this.setState({list: list});
    }

    generateItems() {
        let listoDisplay = [];
        for (let i = 0, n = 0; i < this.length; ++i, ++n) {
            if (i === Math.floor(this.length / 2))
                listoDisplay.push(<PartnerCardFocused partner={this.state.list[n]} move={this.move} callback={this.setter} key={i}/>);
            else if (i === Math.floor(this.length / 2) - 1 || i === Math.floor(this.length / 2) + 1 ||
                    i === Math.floor(this.length / 2) - 2 || i === Math.floor(this.length / 2) + 2)
                listoDisplay.push(<PartnerCard name={this.state.list[n].name} id={i} move={this.move} callback={this.moveTo} length={this.length} key={i}/>);
            else
                listoDisplay.push(<PartnerCard name={this.state.list[n].name} id={i} move={this.move} callback={null} length={this.length} key={i}/>);
            if (n + 1 >= this.partners.length)
                n = - 1;
        };
        this.move = 0
        return (listoDisplay);
    }

    render() {
        return (
            <div className="partner-carrousel--container">
                {this.generateItems()}
            </div>
        )
    }
}

class PartnerCardFocused extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.partner.name,
            partner: props.partner,
            hover: false,
            clicked: false,
            clickable: true
        }

        this.targetContainer = React.createRef();
        this.targetBackground = React.createRef();
        this.targetSquare = React.createRef();
        this.targetText = React.createRef();
        this.targetImage = React.createRef();
        this.targetDescription = React.createRef();
        this.callback = props.callback;
        this.click = this.click.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.partner !== prevProps.partner) {
            setTimeout(() => {this.setState({partner: prevProps.partner});
                anime({
                targets: [this.targetImage.current, this.targetDescription.current],
                easing: 'easeInOutQuint',
                opacity: 1,
                duration: 350,
            });}, 500)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.clicked = false;
        if (nextProps.move === 0)
            return;
        this.setState({clickable: false});
        moveAnimation(this.targetContainer, nextProps.move, 100, () => {
            this.setState({name: nextProps.partner.name});
            this.setState({clickable: true});
            this.callback(nextProps.partner);
        });
        anime({
            targets: this.targetBackground.current,
            easing: 'easeInOutQuint',
            borderBottomRightRadius: "0vh",
            height: "39vh",
            width: "29vh",
            marginLeft: "2.5vw",
            marginRight: "2.5vw",
            marginTop: "0vh",
            duration: 450,
            complete: function(anim) {
                anime({
                    targets: anim.animations[0].animatable.target,
                    easing: 'easeInOutQuint',
                    borderBottomRightRadius: "5.5vh",
                    height: "50vh",
                    width: "35vh",
                    marginLeft: "2vw",
                    marginRight: "2vw",
                    marginTop: "3.8vh",
                    duration: 0
                });
            }
        });
        anime({
            targets: this.targetSquare.current,
            easing: 'easeInOutQuint',
            borderBottomRightRadius: "0vh",
            height: "1.5vh",
            width: "1.5vh",
            duration: 450,
            complete: function(anim) {
                anime({
                    targets: anim.animations[0].animatable.target,
                    easing: 'easeInOutQuint',
                    borderBottomRightRadius: "4.5vh",
                    height: "50vh",
                    width: "35vh",
                    duration: 0
                });
            }
        });
        anime({
            targets: this.targetImage.current,
            easing: 'easeInOutQuint',
            opacity: 0,
            duration: 200,
        });
        anime({
            targets: this.targetText.current,
            easing: 'easeInOutQuint',
            opacity: 1,
            duration: 200,
        });
        anime({
            targets: this.targetDescription.current,
            easing: 'easeInOutQuint',
            opacity: 0,
            duration: 200,
        });
    }

    async click() {
        if (this.state.clickable === false)
            return
        await this.setState({clicked: !this.state.clicked})
        if (this.state.clicked === true) {
            anime({
                targets: this.targetSquare.current,
                easing: 'easeInOutExpo',
                borderBottomRightRadius: "0vh",
                height: "1.5vh",
                duration: 450,
            });
            anime({
                targets: this.targetText.current,
                easing: 'easeInOutQuint',
                opacity: 0,
                duration: 0,
            })
            anime({
                targets: this.targetImage.current,
                easing: 'easeInOutQuint',
                opacity: 0,
                duration: 450,
            });
        } else {
            anime({
                targets: this.targetSquare.current,
                easing: 'easeInOutExpo',
                borderBottomRightRadius: "4.5vh",
                height: "50vh",
                duration: 450,
            });
            setTimeout(() => anime({
                targets: this.targetText.current,
                easing: 'easeInOutQuint',
                opacity: 1,
                duration: 0,
            }), 450)
            anime({
                targets: this.targetImage.current,
                easing: 'easeInOutQuint',
                opacity: 1,
                duration: 450,
            });
        }
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    render() {
        let classBackground = "partner-card-focused--background__extern"
        if (this.state.hover && this.state.clicked === false)
            classBackground += " blue-color--back"
        else
            classBackground += " black-color--back"
        if (this.state.clickable === true)
            classBackground += " button"
        return (
            <div>
                <div className="partner-card-focused--text--container">
                    <div className="partner-card-focused--square blue-color--back"/>
                    <Typing text={this.state.name} startTime={450} spacetime={80} class="partner-card-focused--text black-color font-first" />
                </div>
                <div ref={this.targetContainer} className="partner-card-focused--container">
                    <div ref={this.targetBackground} className={classBackground} onClick={this.click} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                        <div ref={this.targetSquare} className="partner-card-focused--background__intern white-color--back">
                            <img ref={this.targetImage} src={this.state.partner.image} className="partner-card-focused--image select-none" alt="Focused partenaire poster"/>
                        </div>
                        <h1 ref={this.targetText} className="partner-card--text white-color font-first select-none transparent">{this.state.name}</h1>
                        <p ref={this.targetDescription} className="partner-card-focused--description white-color font-first">{this.state.partner.description}</p>
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
            name: props.name,
            hover: false
        }
        this.card = null;
        this.id = props.id;
        this.callback = props.callback;
        this.targetContainer = React.createRef();
        this.targetBackground = React.createRef();
        this.targetSquare = React.createRef();
        this.targetText = React.createRef();

        this.length = props.length;

        this.click = this.click.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
    }

    click() {
        if (this.callback !== null)
            this.callback(this.id)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.move === 0)
            return;
        if (nextProps.move + this.id === Math.floor(this.length / 2))
            this.goBig(nextProps.move, () => this.setState({name: nextProps.name}));
        else {
            moveAnimation(this.targetContainer, nextProps.move, 100, () => this.setState({name: nextProps.name}));
        }
    }

    goBig(move, callback) {
        moveAnimation(this.targetContainer, move, 91, null);
        anime({
            targets: this.targetBackground.current,
            easing: 'easeInOutQuint',
            borderBottomRightRadius: "5.5vh",
            height: "50vh",
            width: "35vh",
            marginLeft: "2vw",
            marginRight: "2vw",
            marginTop: "3.8vh",
            duration: 450,
            complete: function(anim) {
                anime({
                    targets: anim.animations[0].animatable.target,
                    easing: 'easeInOutQuint',
                    borderBottomRightRadius: "0vh",
                    height: "39vh",
                    width: "29vh",
                    marginLeft: "2.5vw",
                    marginRight: "2.5vw",
                    marginTop: "0vh",
                    duration: 0
                });
            }
        });
        anime({
            targets: this.targetSquare.current,
            easing: 'easeInOutQuint',
            borderBottomRightRadius: "4.5vh",
            height: "50vh",
            width: "35vh",
            duration: 450,
            complete: function(anim) {
                callback();
                anime({
                    targets: anim.animations[0].animatable.target,
                    easing: 'easeInOutQuint',
                    borderBottomRightRadius: "0vh",
                    height: "1.5vh",
                    width: "1.5vh",
                    duration: 0
                });
            }
        });
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    render() {
        let classBackground = "partner-card--background"
        if (this.callback !== null)
            classBackground += " button"
        if (this.callback !== null && this.state.hover)
            classBackground += " blue-color--back"
        else
            classBackground += " black-color--back"
        return (
            <div ref={this.targetContainer} >
                <div ref={this.targetBackground}
                    className={classBackground}
                    onClick={this.click}
                    onMouseEnter={this.toggleHover}
                    onMouseLeave={this.toggleHover}>
                    <div ref={this.targetSquare} className="partner-card--square white-color--back"/>
                    <h1 ref={this.targetText} className="partner-card--text white-color font-first">{this.state.name}</h1>
                </div>
            </div>
        )
    }
}


export {PartnerCarrousel, Partner};