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
        let classSquare = "navigation-bar__link-square"
        let classText = "select-none navigation-bar__link-text"
        if (this.state.hover) {
            classSquare += "--hover " + this.triggerColor + "--back"
            classText += "--hover " + this.triggerColor
        }
        else {
            classSquare += " " + this.color + "--back"
            classText += " " + this.color
        }
        return (
            <div className="navigation-bar__link-container "
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this.clicked}>
                <div className={classSquare}/>
                <h3 className={classText}>{this.text}</h3>
            </div>
        )
    }
}

export {NavigationBar, Link};
