import React from 'react';
import Info from './Info.js';
import {vwTOpx, pxTOvw} from '../../assets/convert.js'
import {Overflow, Triangle, TriangleOver} from '../../assets/svg-react/index.js';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.startX = 23;
        this.state = {
            drag: {x: vwTOpx(this.startX)},
        }
        this.clickPoint = 0;

        this.onDrag = this.onDrag.bind(this);
    }

    onDrag(e) {
        var w = window.innerWidth / 2;
        this.setState({drag: {x: vwTOpx(this.startX) + (e.pageX - w) / 10}})
    }

    render() {
        return (
            <div onMouseMove={this.onDrag}>
                <div className="background black-color--back">
                    <Triangle style={{left: pxTOvw(this.state.drag.x) + "vw"}} className="home-logo-element--triangle select-none"/>
                    <div className="home-button-container">
                        <NavButtonHome text="Events" path="/events"/>
                        <NavButtonHome text="Discounts" path="/discounts"/>
                    </div>
                    <Overflow className="home-logo-element--name select-none"/>
                    <TriangleOver style={{left: pxTOvw(this.state.drag.x) + "vw"}} className="home-logo-element--triangle select-none"/>
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

        this.toggleHoverEnter = this.toggleHoverEnter.bind(this);
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this);

        this.clicked = this.clicked.bind(this);
    }

    toggleHoverEnter() {
        this.setState({hover: true})
    }

    toggleHoverLeave() {
        this.setState({hover: false})
    }

    clicked() {
        window.location.href = this.path;
    }

    render() {
        let classContainer = "nav-button-home__above"
        if (this.state.hover === true)
            classContainer += "--hover "
        return (
            <button className="nav-button-home-container button"
                onFocus={this.toggleHoverEnter}
                onBlur={this.toggleHoverLeave}
                onMouseEnter={this.toggleHoverEnter}
                onMouseLeave={this.toggleHoverLeave}
                onClick={this.clicked}>
                <div className={classContainer}>
                    <div className="white-color--back nav-button-home--square"/>
                    <h3 className="white-color select-none nav-button-home--text font-first">{this.text}</h3>
                </div>
                <div>
                    <div className="blue-color--back nav-button-home--square"/>
                    <h3 className="blue-color select-none nav-button-home--text font-first">{this.text}</h3>
                </div>
            </button>
        )
    }
}

export default Home;