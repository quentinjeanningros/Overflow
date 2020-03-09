import React from 'react';
import Button from '../../../modules/Button'
import {NavigationBar, Link}  from '../../../modules/NavigationBar.js';
import './AdminContact.css'
import config from "../../../config";
import LoadingAnimation from "../../../modules/LoadingAnimation";
import TextBox from "../../../modules/TextBox";

class CreateContact extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            values: {
                title: "",
                email: ""
            },
            hover: false,
            focus: false
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.toggleHoverEnter = this.toggleHoverEnter.bind(this);
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this);
        this.toggleFocus = this.toggleFocus.bind(this);

    }

    onFormSubmit() {
        const headers = {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        };
        fetch(config.API_URL + "/contacts", {method: "POST", headers, body: JSON.stringify(this.state.values)})
            .then(() => {this.setState({values: {title: "", email: ""}}); this.props.update()})
            .catch(() => {this.setState({values: {title: "", email: ""}}); this.props.update()});
    }

    setTitle(title) {
        let values = this.state.values;
        values.title = title;
        this.setState({values: values});
    }

    setEmail(email) {
        let values = this.state.values;
        values.email = email;
        this.setState({values: values});
    }

    toggleHoverEnter() {
        this.setState({hover: true});
    }

    toggleHoverLeave() {
        this.setState({hover: false});
    }

    toggleFocus() {
        this.setState({focus: !this.state.focus})
    }

    render() {
        let containerClass = "white-color--border create-contact-container";
        return (
            <div className={containerClass}>
                <TextBox value={this.state.values.title} class="" label="Title" type="text" callback={this.setTitle}/>
                <TextBox value={this.state.values.email} class="" label="Email" type="text" callback={this.setEmail}/>
                <Button text="Create" callback={this.onFormSubmit} fontSize="3vh"/>
            </div>
        )
    }
}

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hover : false,
            hoverButtonCopy : false,
            hoverButtonDelete : false,
            editing: false,
            values: this.props.contact
        };
        this.saveModify = this.saveModify.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.toggleHoverEnter = this.toggleHoverEnter.bind(this);
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this);
        this.toggleHoverButtonCopyEnter = this.toggleHoverButtonCopyEnter.bind(this);
        this.toggleHoverButtonCopyLeave = this.toggleHoverButtonCopyLeave.bind(this);
        this.toggleHoverButtonDeleteEnter = this.toggleHoverButtonDeleteEnter.bind(this);
        this.toggleHoverButtonDeleteLeave = this.toggleHoverButtonDeleteLeave.bind(this);
    }

    saveModify() {
        if (this.state.editing) {
            const headers = {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            };
            fetch(config.API_URL + "/contacts", {method: "PATCH", headers, body: JSON.stringify(this.state.values)})
                .then(() => {this.setState({editing: false}); this.props.update()})
                .catch(() => {this.setState({editing: false}); this.props.update()});
        } else {
            this.setState({editing: true, values: this.props.contact});
        }
    }

    cancelDelete() {
        if (this.state.editing) {
            this.setState({editing: false, values: this.props.contact});
        } else {
            this.props.delete(this.props.contact.id);
            this.setState({editing: false, values: this.props.contact});
        }
    }

    setTitle(title) {
        let values = this.state.values;
        values.title = title;
        this.setState({values: values});
    }

    setEmail(email) {
        let values = this.state.values;
        values.email = email;
        this.setState({values: values});
    }

    toggleHoverEnter() {
        this.setState({hover: true});
    }

    toggleHoverLeave() {
        this.setState({hover: false});
    }

    toggleHoverButtonCopyEnter() {
        this.setState({hoverButtonCopy: true});
    }

    toggleHoverButtonCopyLeave() {
        this.setState({hoverButtonCopy: false});
    }

    toggleHoverButtonDeleteEnter() {
        this.setState({hoverButtonDelete: true});
    }

    toggleHoverButtonDeleteLeave() {
        this.setState({hoverButtonDelete: false});
    }

    render() {
        let classContainer = "contact-buttons--container"
        if(this.state.hover || this.state.hoverButtonCopy || this.state.hoverButtonDelete)
            classContainer += " blue-color--border"
        else
            classContainer += " white-color--border"

        let classButtonCopy = "button font-first contact-button"
        if (this.state.hoverButtonCopy)
            classButtonCopy += " blue-color--border blue-color"
        else
            classButtonCopy += " white-color--border white-color"

        let classButtonDelete = "button font-first contact-button"
        if (this.state.hoverButtonDelete)
            classButtonDelete += " white-color--border white-color"
        else
            classButtonDelete += " orange-color--border orange-color"
        return (
            <div className="contact--container"
                 onMouseEnter={this.toggleHoverEnter}
                 onMouseLeave={this.toggleHoverLeave}>
                <div style={{"color": "white"}}>
                    Id: {this.props.contact.id} <br/>
                    {this.state.editing ? <TextBox value={this.state.values.title} class="" label="Title" type="text" callback={this.setTitle}/> : "Title: " + this.props.contact.title} <br/>
                    {this.state.editing ? <TextBox value={this.state.values.email} class="" label="Email" type="text" callback={this.setEmail}/> : "Email: " + this.props.contact.email} <br/>
                </div>
                <div className={classContainer}>
                    <button className={classButtonCopy} onClick={this.saveModify}
                            onFocus={this.toggleHoverButtonCopyEnter}
                            onBlur={this.toggleHoverButtonCopyLeave}
                            onMouseEnter={this.toggleHoverButtonCopyEnter}
                            onMouseLeave={this.toggleHoverButtonCopyLeave}>{this.state.editing ? "Save" : "Modify"}</button>
                    <button className={classButtonDelete} onClick={this.cancelDelete}
                            onFocus={this.toggleHoverButtonDeleteEnter}
                            onBlur={this.toggleHoverButtonDeleteLeave}
                            onMouseEnter={this.toggleHoverButtonDeleteEnter}
                            onMouseLeave={this.toggleHoverButtonDeleteLeave}>{this.state.editing ? "Cancel" : "Delete"}</button>
                </div>
            </div>
        );
    }
}

class AdminContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            contacts: [],
            hover: false
        };
        this.linkedPages = [new Link("Events", "/admin/events"), new Link("Partnership", "/admin/partnership"), new Link("Files", "/admin/files")];
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.backHome = this.backHome.bind(this);
        this.toggleHoverEnter = this.toggleHoverEnter.bind(this);
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this);
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    backHome() {
        window.location.href = '/home';
    }

    toggleHoverEnter() {
        this.setState({hover: true});
    }

    toggleHoverLeave() {
        this.setState({hover: false});
    }

    update() {
        if (this.state.loading) return;
        this.setState({loading: true});
        fetch(config.API_URL + "/contacts", {method: "GET"})
            .then(response => response.json())
            .then(result => this.setState({loading: false, contacts: result}))
            .catch(e => {});
    }

    delete(id) {
        if (this.state.loading) return;
        console.log("delete contact " + id);
        this.setState({loading: true});
        const headers = {
            'Authorization': localStorage.getItem('token')
        };
        fetch(config.API_URL + "/contacts/" + id, {method: "DELETE", headers})
            .then(() => {this.setState({loading: false}); this.update()})
            .catch(() => {this.setState({loading: false}); this.update()});
    }

    componentDidMount() {
        this.update();
    }

    render() {
        let classHover = "font-first admin-contact--refresh-button--text"
        if (this.state.hover)
            classHover += "--hover blue-color "
        else
            classHover += " white-color "
        let classHoverButton = "admin-contact--refresh-button"
        if (this.state.hover)
            classHoverButton += " blue-color--border"
        else
            classHoverButton += " white-color--border"
        return (
            <div className="background black-color--back">
                <div id="admin-contact-page" className="black-color--back">
                    <NavigationBar color="white-color" triggerColor="blue-color" links={this.linkedPages}/>
                    <div className="admin-main-button--container">
                        <Button text="logout" callback={this.logout} class="admin-main-button"/>
                        <Button text="back to site" callback={this.backHome} class="admin-main-button"/>
                    </div>
                    <button className={classHoverButton} onClick={this.update}
                            onFocus={this.toggleHoverEnter}
                            onBlur={this.toggleHoverLeave}
                            onMouseEnter={this.toggleHoverEnter}
                            onMouseLeave={this.toggleHoverLeave}>
                        <div className={classHover}>REFRESH</div>
                    </button>
                    <h1 className="font-second white-color admin-contact-title">Manage contacts</h1>
                    <div className="admin-contact-container">
                        <CreateContact update={this.update}/>
                        <div className="admin-contact--contact-container">
                            {
                                this.state.loading ?
                                    <LoadingAnimation height={400} width={400} callback={() => {}}/> :
                                    this.state.contacts.map((contact, i) => <Contact key={i} contact={contact} update={this.update} delete={this.delete}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminContact;