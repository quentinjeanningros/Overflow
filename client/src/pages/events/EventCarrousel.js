import React from 'react';
import './EventCarrousel.css';
import anime from 'animejs/lib/anime.es.js';

class EventCarrousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
        };
    }

    generateItems(list) {
        let listoDisplay = [];
        let i = 1
        list.forEach(element => {
            listoDisplay.push(<EventCard event={element} callback={this.props.callback} key={i++}/>)
        });
        return (listoDisplay);
    }

    render() {
        return (
            <div className="event-carrousel--container">
                {this.generateItems(this.state.list)}
            </div>
        )
    }
}

class EventCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            hoverLink: false
        };
        this.toggleHover = this.toggleHover.bind(this);
        this.toggleHoverLink = this.toggleHoverLink.bind(this);
        this.click = this.click.bind(this);
        this.target = React.createRef();
        this.audio = new Audio(this.props.event.audio);
        this.playPromise = undefined;
    }

    async toggleHover() {
        await this.setState({hover: !this.state.hover})
        this.props.callback(this.props.event)
        if (this.state.hover) {
            let callback = () => {this.playAudio()}
            anime({
                targets: this.target.current,
                marginRight: "-5%",
                opacity: 1,
                easing: 'easeInOutSine',
                duration: 400,
                complete: function() {callback()}
            })
        } else {
            let callback = () => {this.stopAudio()}
            anime({
                targets: this.target.current,
                marginRight: "-50%",
                opacity: 0,
                easing: 'easeInOutSine',
                duration: 400,
                complete: function() {callback()}
            })
        }
    }

    toggleHoverLink() {
        this.setState({hoverLink: !this.state.hoverLink})
    }

    click() {
        if (this.state.hover)
            window.open(this.props.event.location);
    }

    playAudio() {
        if (this.audio !== undefined) {
            this.audio.loop = true;
            this.audio.volume = 0;
            this.playPromise = this.audio.play();
            if (this.playPromise !== undefined) {
                this.playPromise.then(() =>
                    anime({
                        targets: this.audio,
                        volume: [0, 1],
                        easing: 'easeInOutSine',
                        duration: 500,
                        delay: 1500
                    })
                )
            }
        }
    }

    stopAudio() {
        if (this.playPromise !== undefined) {
            this.playPromise.then(_ => {
                this.audio.pause();
                this.audio.currentTime = 0;
            })
        }
    }

    componentWillUnmount() {
        this.stopAudio()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.event !== this.props.event) {
            this.stopAudio()
            this.audio = new Audio(this.props.event.audio);
        }
    }

    render() {
        let classCard = "event-card--container"
        let classImage = "event-card--image"
        if (this.state.hover) {
            classCard += "--hover"
            classImage += "--hover"
        }
        let classLink = "button font-first blue-color event-card-info--link"
        if (this.state.hoverLink)
            classLink += "--hover";
        return (
            <div className={classCard}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}>
                <img src={this.props.event.image}
                className={classImage}
                alt="Event poster"/>
                <div ref={this.target} className="black-color--back event-card-info--container">
                    <div className="event-card-info--first">
                        <h1 className="white-color font-first event-card-info--price">{this.props.event.price}</h1>
                        <h4 className="white-color font-first event-card-info--euro">€</h4>
                    </div>
                    <div className="event-card-info--second">
                        <h2 className={classLink}
                            onMouseEnter={this.enterHoverLink}
                            onMouseLeave={this.toggleHoverLink}
                            onClick={this.click}>
                                Where ?
                        </h2>
                        <h2 className="white-color font-first event-card-info--date">{this.props.event.date}</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventCarrousel;