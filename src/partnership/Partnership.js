import React from 'react';
import Topbar from '../assets/Topbar.js';
import './Partnership.css'

class Partnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.pages = ["Home", "Events"]
    }

    render() {
        return (
            <div className="background white-backcolor">
                <div className="square-title black-backcolor"/>
                <h1 className="page-title black-color">Partnership</h1>
                <Topbar color="black-color" triggerColor="blue-color" pages={this.pages}/>
            </div>
        )
    }
}

export default Partnership;