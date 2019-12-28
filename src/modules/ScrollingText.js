import React from 'react';
import './ScrollingText.css';

class ScrollingText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.text = props.text
        this.background = props.background
        this.color = props.color
        this.font = props.font
        this.interation = props.interation
    }

    render() {
        let classContainer  = this.background + " scrolling-text--container"
        let classText = this.font + " scrolling-text--text " + this.color;
        let texts = []
        for (let index = 0; index < this.interation; index++)
            texts.push( <div className="scrolling-text--animation" key={index}>
                            <h3 className={classText}>{this.text}</h3>
                        </div>);
        return (
            <div onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className={classContainer}>
                {texts}
            </div>
        )
    }
}

export default ScrollingText;