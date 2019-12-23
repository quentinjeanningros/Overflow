import React from 'react';
import './Topbar.css'

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.color = props.color;
        this.triggerColor = props.triggerColor;
        this.pages = props.pages;
    }

    render() {
        let i = 0;
        let pagesToDisplay = []
        this.pages.forEach(element => {
            pagesToDisplay.push(<Page color={this.color} triggerColor={this.triggerColor} text={element} id={i}/>);
            ++i
        });
        return (
            <div className="navigation__container ">
                {pagesToDisplay}
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
        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    render() {
        let classText = "navigation__name-text select-none "
        if (this.state.hover)
            classText += this.triggerColor
        else
            classText += this.color
        return (
            <div className="navigation__name-container ">
                <h3 className={classText}  onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>{this.text}</h3>
            </div>
        )
    }
}

export default Topbar;