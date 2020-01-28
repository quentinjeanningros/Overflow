import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../assets/loading-animation.json'


class LoadingAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            setSpeed: 2,
            animationData: animationData.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
        };
        return (
            <Lottie options={defaultOptions}
                height={this.props.height}
                width={this.props.width}
                eventListeners={[
                    {
                    eventName: 'loopComplete',
                    callback: () => this.props.callback()
                    },
                ]}/>
        )
    }
}

export default LoadingAnimation;