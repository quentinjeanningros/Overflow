import React from 'react';
import UploadFile from "./UploadFile";
import config from "../../../config";
import {NavigationBar, Link}  from '../../../modules/NavigationBar.js';
import Button from '../../../modules/Button'
import './Files.css'
import LoadingAnimation from "../../../modules/LoadingAnimation";

class File extends React.Component {
    constructor(props) {
        super(props);
        let elements = this.props.file.split("/");
        this.state = {
            loading: false,
            hover : false,
            hoverButtonCopy : false,
            hoverButtonDelete : false,
            name: elements[elements.length - 1]
        };
        this.deleteFile = this.deleteFile.bind(this);
        this.toggleHoverEnter = this.toggleHoverEnter.bind(this)
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this)
        this.toggleHoverButtonCopyEnter = this.toggleHoverButtonCopyEnter.bind(this)
        this.toggleHoverButtonCopyLeave = this.toggleHoverButtonCopyLeave.bind(this)
        this.toggleHoverButtonDeleteEnter = this.toggleHoverButtonDeleteEnter.bind(this)
        this.toggleHoverButtonDeleteLeave = this.toggleHoverButtonDeleteLeave.bind(this)
        this.copyToClip = this.copyToClip.bind(this)
    }

    deleteFile() {
        this.props.delete(this.state.name);
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

    copyToClip() {
        var el = document.createElement('textarea');
        el.value = this.props.file;
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        el.select();
        el.setSelectionRange(0, 99999)
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    render() {
        let classContainer = "file-buttons--container"
        if(this.state.hover || this.state.hoverButtonCopy || this.state.hoverButtonDelete)
            classContainer += " blue-color--border"
        else
            classContainer += " white-color--border"

        let classButtonCopy = "button font-first file-button"
        if (this.state.hoverButtonCopy)
            classButtonCopy += " blue-color--border blue-color"
        else
            classButtonCopy += " white-color--border white-color"

        let classButtonDelete = "button font-first file-button"
            if (this.state.hoverButtonDelete)
                classButtonDelete += " white-color--border white-color"
            else
                classButtonDelete += " orange-color--border orange-color"
        return (
            <div className="file--container"
                onMouseEnter={this.toggleHoverEnter}
                onMouseLeave={this.toggleHoverLeave}>
                <img src={this.props.file} alt="file-img" className="file-file"/>
                <div>
                    {this.state.name}
                </div>
                <div className={classContainer}>
                    <button className={classButtonCopy} onClick={this.copyToClip}
                        onFocus={this.toggleHoverButtonCopyEnter}
                        onBlur={this.toggleHoverButtonCopyLeave}
                        onMouseEnter={this.toggleHoverButtonCopyEnter}
                        onMouseLeave={this.toggleHoverButtonCopyLeave}>Copy Path</button>
                    <button className={classButtonDelete} onClick={this.deleteFile}
                        onFocus={this.toggleHoverButtonDeleteEnter}
                        onBlur={this.toggleHoverButtonDeleteLeave}
                        onMouseEnter={this.toggleHoverButtonDeleteEnter}
                        onMouseLeave={this.toggleHoverButtonDeleteLeave}>Delete</button>
                </div>
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
            hover: false
        };
        this.linkedPages = [new Link("Events", "/admin/events"), new Link("Partnership", "/admin/partnership"), new Link("Contacts", "/admin/contacts")];
        this.update = this.update.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
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
        fetch(config.API_URL + "/files", {method: "GET"})
            .then(response => response.json())
            .then(result => this.setState({loading: false, files: result}))
            .catch(e => {});
    }

    deleteFile(name) {
        if (this.state.loading) return;
        console.log("delete file " + name);
        this.setState({loading: true});
        const headers = {
            'Authorization': localStorage.getItem('token')
        };
        fetch(config.API_URL + "/files/" + name, {method: "DELETE", headers})
            .then(() => {this.setState({loading: false}); this.update()})
            .catch(() => {this.setState({loading: false}); this.update()});
    }

    componentDidMount() {
        this.update();
    }

    render() {
        let classHover = "font-first admin-file--refresh-button--text"
        if (this.state.hover)
            classHover += "--hover blue-color "
        else
            classHover += " white-color "
        let classHoverButton = "admin-file--refresh-button"
        if (this.state.hover)
            classHoverButton += " blue-color--border"
        else
            classHoverButton += " white-color--border"
        return (
            <div className="background black-color--back">
            <div id="admin-file-page" className="black-color--back">
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
                <h1 className="font-second white-color admin-files-title">Manage files</h1>
                <div className="admin-file-container">
                    <UploadFile onUpload={this.update}/>
                    <div className="admin-file--file-container">
                        {
                            this.state.loading ?
                                <LoadingAnimation height={400} width={400} callback={() => {}}/> :
                            this.state.files.map((file, i) => <File key={i} file={file} update={this.update} delete={this.deleteFile}/>)
                        }
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Files;