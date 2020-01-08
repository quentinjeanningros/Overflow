import React from 'react';

class ReactSvgLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.click = this.click.bind(this);
    }

    click() {
        if (this.props.activateClick)
            window.open(this.props.link);
    }

    render() {
        return (
            <this.props.image className={this.props.class} onClick={this.click}/>
        )
    }
}

export default ReactSvgLink;