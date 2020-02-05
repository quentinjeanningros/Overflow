import React from 'react';
import Button from '../../../modules/Button'
import {NavigationBar, Link}  from '../../../modules/NavigationBar.js';
import './AdminEvent.css'

class AdminContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.logout = this.logout.bind(this)
        this.linkedPages = [new Link("Files", "/admin/files"), new Link("Partnership", "/admin/partnership"), new Link("Contacts", "/admin/contacts")];
        this.backHome = this.backHome.bind(this);
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    backHome() {
        window.location.href = '/home';
    }

    render() {
        return (
            <div className="background black-color--back">
            <div className="black-color--back">
                <NavigationBar color="white-color" triggerColor="blue-color" links={this.linkedPages}/>
                <div className="admin-main-button--container">
                    <Button text="logout" callback={this.logout} class="admin-main-button"/>
                    <Button text="back to site" callback={this.backHome} class="admin-main-button"/>
                </div>
            </div>
            </div>
        );
    }
}

export default AdminContact;