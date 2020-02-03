import React from 'react';
import UploadFile from "./UploadFile";
import config from "../../../config";
import {NavigationBar, Link}  from '../../../modules/NavigationBar.js';
import Button from '../../../modules/Button'
import './Files.css'

class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    deleteFile() {
        /*
        if (this.state.loading) return;
        this.setState({loading: true});
        fetch(config.API_URL + "/files/", {method: "DELETE"})
            .then(response => response.json())
            .then(result => this.setState({loading: false, files: result}))
            .catch(e => {});
         */
    }

    render() {
        return (
            <div>
                {this.props.file}
                <img src={this.props.file} alt="" style={{height: 200}}/>
                <button onClick={this.deleteFile}> DELETE FILE </button>
                <br/>
            </div>
        );
    }
}

class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            files: [],
        };
        this.linkedPages = [new Link("Events", "/admin/events"), new Link("Partnership", "/admin/partnership"), new Link("Contacts", "/admin/contacts")];
        this.update = this.update.bind(this);
        this.loading = this.logout.bind(this);
        this.backHome = this.backHome.bind(this);
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    backHome() {
        window.location.href = '/home';
    }

    update() {
        if (this.state.loading) return;
        this.setState({loading: true});
        fetch(config.API_URL + "/files", {method: "GET"})
            .then(response => response.json())
            .then(result => this.setState({loading: false, files: result}))
            .catch(e => {});
    }

    componentDidMount() {
        this.update();
    }

    render() {
        return (
            <div className="admin-page background black-color--back">
                <NavigationBar color="white-color" triggerColor="blue-color" links={this.linkedPages}/>
                <div className="admin-main-button--container">
                    <Button text="logout" callback={this.logout} class="admin-main-button"/>
                    <Button text="back to site" callback={this.backHome} class="admin-main-button"/>
                </div>
                <div className="admin-files-title--container">
                    <h1 className="font-second white-color admin-files-title">Manage files</h1>
                    <UploadFile onUpload={this.update}/>
                </div>
                <br/>
                {this.state.loading ? "LOADING" : null}
                <br/>
                <button onClick={this.update}> REFRESH </button>
                <br/>
                {
                    this.state.files.map((file, i) => <File key={i} file={file} update={this.update} />)
                }
            </div>
        );
    }
}

export default Files;