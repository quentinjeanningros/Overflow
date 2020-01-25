import React from 'react';
import {PartnerCarrousel, Partner}  from './PartnerCarrousel.js';
import {NavigationBar, Link}  from '../../modules/NavigationBar.js';
import './Partnership.css'
import ReactSvgLink from '../../modules/ReactSvgLink.js'
import {SchoolEart, SchoolIseg, SchoolEpitech} from '../../assets/svg-react/index.js'
import Typing from '../../modules/Typing.js';
import config from '../../config';

//TODELET
import affiche from '../../assets/Affiche_Barberousse.png'

const default_partner = {name: "", image: "", info: "", epitech: false, eartsup: false, iseg: false};

class Partnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: default_partner,
            loading: true,
            error: null,
            partners: [],
        };
        this.linkedPages = [new Link("Home", "/home"), new Link("Events", "events")];

        this.partners = [new Partner("Barberousse", true, true, true, affiche, "Accompagnement offert sur un menu avec le code : 799001435"),
            new Partner("Flam's", true, false, false, affiche, "Happy hour valables toute la nuit le mardi, mercredi et jeudi"),
            new Partner("McDonald's", true, false, true, affiche, "Happy hour valables toute la nuit le mardi, mercredi et jeudi"),
            new Partner("Chez Victor", true, true, true, affiche, "Les salades sont au prix de celles vendus sans l'emballage, et une réduction supplémentaire s'applique vous prenez réellement votre emballage | Sandwich à composer à 5€ au lieu de 5.90€"),
            new Partner("Nooï", true, false, false, affiche, "Seul ou en petit groupe : Boisson offerte En grand groupe : Flams à volonté et 1L de boisson pour 14€/p | 3,20€ la traditionnelle et 4€ la gratinée à emporter)"),
            new Partner("Le Phonographe", true, true, true, affiche, "Happy hour prolongé jusqu'à minuit toute la semaine ! 3€ la pinte de Meteor !")];

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
        return (
            <div id="partnership-page" className="background white-color--back">
                <div className="square-title black-color--back"/>
                <h1 className="page-title font-second black-color select-none">Partnership</h1>
                <NavigationBar color="black-color" triggerColor="blue-color" links={this.linkedPages}/>
                <div className="partnership--carrousel">
                    {
                        this.state.loading ? null : this.state.error ? "error" :
                        <PartnerCarrousel partners={this.state.partners} callback={this.setFocused}/>
                    }
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