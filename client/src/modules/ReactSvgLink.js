import React from 'react';

class ReactSvgLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };

        this.toggleHover = this.toggleHover.bind(this);
        this.click = this.click.bind(this);
    }

    click() {
        if (this.props.activateClick)
            window.open(this.props.link);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    render() {
        let classImage = this.props.class;
        if (this.state.hover && this.props.activateClick)
            classImage += " " + this.props.classHover;
        return (
            <this.props.image className={classImage}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this.click}/>
        )
    }
}

export default ReactSvgLink;