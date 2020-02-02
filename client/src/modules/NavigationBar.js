import React from 'react';
import './NavigationBar.css'

class Link {
    constructor(text, path) {
        this.text = text
        this.path = path
    }
}

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.color = props.color;
        this.triggerColor = props.triggerColor;
        this.links = props.links;
    }

    render() {
        let i = 0;
        let linksToDisplay = []
        this.links.forEach(element => {
            linksToDisplay.push(<Page
                color={this.color}
                triggerColor={this.triggerColor}
                text={element.text}
                path={element.path}
                key={i}/>);
            ++i
        });
        return (
            <div className="navigation-bar__container ">
                {linksToDisplay}
            </div>
        )
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
        this.color = props.color;
        this.triggerColor = props.triggerColor;
        this.text = props.text;
        this.path = props.path;


        this.toggleHoverEnter = this.toggleHoverEnter.bind(this)
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this)
        this.clicked = this.clicked.bind(this);
    }

    toggleHoverEnter() {
        this.setState({hover: true});
    }

    toggleHoverLeave() {
        this.setState({hover: false});
    }

    clicked() {
        window.location.href = this.path;
    }

    render() {
        let classSquare = "navigation-bar__link-square"
        let classText = "select-none font-second navigation-bar__link-text"
        if (this.state.hover) {
            classSquare += "--hover " + this.triggerColor + "--back"
            classText += "--hover " + this.triggerColor
        }
        else {
            classSquare += " " + this.color + "--back"
            classText += " " + this.color
        }
        return (
            <button className="navigation-bar__link-container button "
                onFocus={this.toggleHoverEnter}
                onBlur={this.toggleHoverLeave}
                onMouseEnter={this.toggleHoverEnter}
                onMouseLeave={this.toggleHoverLeave}
                onClick={this.clicked}>
                <div className={classSquare}/>
                <h3 className={classText}>{this.text}</h3>
            </button>
        )
    }
}

export {NavigationBar, Link};
