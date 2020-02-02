import React from 'react';
import PartnerCarrousel  from './PartnerCarrousel.js';
import {NavigationBar, Link}  from '../../modules/NavigationBar.js';
import './Partnership.css'
import ReactSvgLink from '../../modules/ReactSvgLink.js'
import {SchoolEart, SchoolIseg, SchoolEpitech} from '../../assets/svg-react/index.js'
import Typing from '../../modules/Typing.js';
import config from '../../config';
import LoadingAnimation from '../../modules/LoadingAnimation.js';

const default_partner = {name: "", image: "", info: "", epitech: false, eartsup: false, iseg: false};

class Partnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: default_partner,
            loading: true,
            error: null,
            partners: [],
            loop: true
        };
        this.linkedPages = [new Link("Home", "/home"), new Link("Events", "events")];
        this.partners = []
        this.setFocused = this.setFocused.bind(this);
    }

    setFocused(partner) {
        if (this.state.focused !== partner) {
            this.setState({focused: partner})
        }
    }

    componentDidMount() {
        fetch(config.API_URL + "/partnerships", {method: "GET"})
            .then(response => response.json())
            .then(result => {
                this.setState({loading: false, error: null, partners: result});
            })
            .catch(e => {
                this.setState({loading: false, error: e, partners: []});
            });
    }

    render() {
        let IsegClass = "button partnerchip-school-svg black-color--fill"
        if (!this.state.focused.iseg)
            IsegClass += " transparent";
        else
            IsegClass += " button";
        let EpiClass = "button partnerchip-school-svg black-color--fill"
        if (!this.state.focused.epitech)
            EpiClass += " transparent";
        else
            EpiClass += " button";
        let EartClass = "partnerchip-school-svg black-color--fill"
        if (!this.state.focused.eartsup)
            EartClass += " transparent";
        else
            EartClass += " button";
        let carrousel = null
        if (this.state.error)
            carrousel = <h2 className="orange-color font-first login-error">{this.state.error.toUpperCase()}</h2>;
        else if (this.state.loop === true) {
            const callback = () => {
                if (this.state.loading === false)
                        this.setState({loop: false});
            }
            carrousel = <div className="partnership-loading"><LoadingAnimation height={400} width={400} callback={callback}/></div>
        }
        else
            carrousel = <PartnerCarrousel partners={this.state.partners} callback={this.setFocused}/>
        return (
            <div id="partnership-page" className="background white-color--back">
                <div className="square-title black-color--back"/>
                <h1 className="page-title font-second black-color select-none">Discounts</h1>
                <NavigationBar color="black-color" triggerColor="blue-color" links={this.linkedPages}/>
                <div className="partnership--carrousel">
                    {carrousel}
                </div>
                <div className="partnership--focused-text--container">
                    <Typing text={this.state.focused.name.toUpperCase()} startTime={500} spacetime={80} class="partnership--focused-text black-color font-first"/>
                </div>
                <div className="partnerchip-school--container">
                    <ReactSvgLink image={SchoolEart} class={EartClass} classHover="blue-color--fill partnerchip-school-svg--hover" activateClick={this.state.focused.eartsup} link={"https://www.e-artsup.net/"}/>
                    <ReactSvgLink image={SchoolEpitech} class={EpiClass} classHover="blue-color--fill partnerchip-school-svg--hover" activateClick={this.state.focused.epitech} link={"https://www.epitech.eu/"}/>
                    <ReactSvgLink image={SchoolIseg} class={IsegClass} classHover="blue-color--fill partnerchip-school-svg--hover" activateClick={this.state.focused.iseg} link={"https://www.iseg.fr/"}/>
                </div>
            </div>
        )
    }
}

export default Partnership;