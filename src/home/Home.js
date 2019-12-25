import React from 'react';
import './Home.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="background black-color--back">
                <div className="home-button-container">
                    <NavButtonHome text="Events" path="/events"/>
                    <NavButtonHome text="Discounts" path="/partnership"/>
                </div>
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
            <div className="nav-button-home-container"
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this.clicked}>
                <div className="nav-button-home__marging">
                    <div className="blue-color--back nav-button-home--square"/>
                    <h3 className="blue-color select-none nav-button-home--text">{this.text}</h3>
                </div>
                <div className={classContainer}>
                    <div className="white-color--back nav-button-home--square"/>
                    <h3 className="white-color select-none nav-button-home--text">{this.text}</h3>
                </div>
            </div>
        )
    }
}

export default Home;