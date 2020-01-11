import React from 'react';

class Typing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            textDisplay: "",
        }
        this.spacetime = props.spacetime;
        this.startTime = props.startTime;
        this.increment = 0;
        this.newText = "";
        this.inChange = false;

        this.typing = this.typing.bind(this);
        this.change = this.change.bind(this);
    }

    async typing() {
        const {textDisplay, text} = this.state;
        if (textDisplay.length < text.length) {
            this.increment += 1;
            await this.setState({textDisplay: text.substring(0, this.increment)})
            setTimeout(this.typing, this.spacetime);
        }
    }

    async change(nextText) {
        const {text} = this.state;
        if (this.increment !== 0) {
            this.increment -= 1;
            await this.setState({textDisplay: text.substring(0, this.increment)})
            setTimeout(this.change, this.spacetime / 3);
            this.inChange = true;
        } else {
            this.inChange = false;
            this.setState({text: this.newText});
            setTimeout(this.typing, this.spacetime);
        }
    }

    componentDidMount() {
        setTimeout(this.typing, this.startTime);
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.newText !== nextProps.text) {
            this.newText = nextProps.text
            if (this.increment !== 0 && this.inChange === true) {
                const {text} = this.state;
                this.increment = 0;
                await this.setState({textDisplay: text.substring(0, this.increment)})
                this.setState({text: this.newText});
                setTimeout(this.typing, this.spacetime);
            } else
                this.change()
        }
    }

    render() {
        return (
            <div>
                <h1 className={this.props.class}>{this.state.textDisplay}</h1>
            </div>
        )
    }
}

export default Typing;