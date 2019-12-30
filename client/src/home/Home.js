import React from 'react';
import Info from './Info.js';
import anime from 'animejs/lib/anime.es.js';
import {Overflow, Triangle, TriangleOver} from '../assets/svg-react/index.js';
import './Home.css';

function vwTOpx(value) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
    var result = (x*value)/100;
    return result;
  }

function pxTOvw(value) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
    var result = (100*value)/x;
    return result;
  }

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.startX = 23;
        this.state = {
            drag: {x: vwTOpx(this.startX)},
        }
        this.isDrag = false;
        this.clickPoint = 0;

        this.onStart = this.onStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    onStart(e) {
        if(!this.isDrag) {
            this.clickPoint = e.pageX;
            this.isDrag = true;
        }
    }

    onDrag(e) {
        if(this.isDrag)
            this.setState({drag: {x: vwTOpx(this.startX) + (e.pageX - this.clickPoint) / 2}})
    }

    onEnd() {
        let {drag} = this.state;
        if(this.isDrag){
            let virtualDrag = drag
            this.isDrag = false
            anime({
                targets: virtualDrag,
                x: vwTOpx(this.startX),
                easing: 'easeOutElastic',
                duration: 1000,
                update: () => {this.setState({drag: {x: virtualDrag.x}})}
            })
        }
    }


    render() {
        let grab = this.isDrag ? "grabbing" : "grab"
        return (
            <div>
                <div className="background black-color--back">
                    <Triangle style={{left: pxTOvw(this.state.drag.x) + "vw"}} className="home-logo-element--triangle select-none"/>
                    <div className="home-button-container">
                        <NavButtonHome text="Events" path="/events"/>
                        <NavButtonHome text="Discounts" path="/partnership"/>
                    </div>
                    <Overflow className="home-logo-element--name select-none"/>
                    <TriangleOver style={{left: pxTOvw(this.state.drag.x) + "vw", cursor: grab}} className="home-logo-element--triangle select-none"
                    onMouseDown={this.onStart}
                    onMouseMove={this.onDrag}
                    onMouseUp={this.onEnd}
                    onMouseLeave={this.onEnd}/>
                </div>
                <Info/>
            </div>
        )
    }
}

class NavButtonHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
        this.text = props.text
        this.path = props.path

        this.toggleHover = this.toggleHover.bind(this);
        this.clicked = this.clicked.bind(this);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    clicked() {
        window.location.href = this.path;
    }

    render() {
        let classContainer = "nav-button-home__marging"
        if (this.state.hover)
            classContainer += "--hover "
        return (
            <div className="nav-button-home-container button"
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this.clicked}>
                <div className="nav-button-home__marging">
                    <div className="blue-color--back nav-button-home--square"/>
                    <h3 className="blue-color select-none nav-button-home--text font-first">{this.text}</h3>
                </div>
                <div className={classContainer}>
                    <div className="white-color--back nav-button-home--square"/>
                    <h3 className="white-color select-none nav-button-home--text font-first">{this.text}</h3>
                </div>
            </div>
        )
    }
}

export default Home;