import React from 'react';
import Button from '../../../modules/Button'
import './AdminHome.css'
import {NavigationBar, Link}  from '../../../modules/NavigationBar.js';

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.logout = this.logout.bind(this)

        this.files = this.redirect.bind(this, "/admin/files")
        this.events = this.redirect.bind(this, "/admin/events")
        this.partnership = this.redirect.bind(this, "/admin/partnership")
        this.contacts = this.redirect.bind(this, "/admin/contacts")
        this.linkedPages = [new Link("Files", "/admin/files"), new Link("Events", "/admin/events"),
                            new Link("Partnership", "/admin/partnership"), new Link("Contacts", "/admin/contacts")];
        this.backHome = this.backHome.bind(this);
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    backHome() {
        window.location.href = '/home';
    }

    redirect(link) {
        window.location.href = link;
    }

    render() {
        return (
            <div className="background black-color--back">
            <div id="admin-home" className="black-color--back">
                <NavigationBar color="white-color" triggerColor="blue-color" links={this.linkedPages}/>
                <div className="admin-main-button--container">
                    <Button text="logout" callback={this.logout} class="admin-main-button"/>
                    <Button text="back to site" callback={this.backHome} class="admin-main-button"/>
                </div>
                <div className="admin-home--container">
                    <p className="font-first white-color admin-home--text">
                        Manage <span><Button intext text="files" callback={this.files} fontSize="7vh"/></span> and use them in the<br/>following pages. <br/><br/>
                        Add new <span><Button intext text="events" callback={this.events} fontSize="7vh"/></span> for the campus,<br/>
                        <Button intext text="partnership" callback={this.partnership} fontSize="7vh"/> let you change discounts.<br/> <br/>
                        Who lead,  <br/>who design,  <br/>let them know in <Button intext text="contacts" callback={this.contacts} fontSize="7vh"/>.
                    </p>
                </div>
            </div>
            </div>
        );
    }
}

export default AdminHome;