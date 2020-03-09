import React from 'react';
import './UploadFile.css'
import config from "../../../config";
import Button from '../../../modules/Button';

class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null,
            filename: "",
            hover: false,
            focus: false
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.updateFileName = this.updateFileName.bind(this);
        this.toggleHoverEnter = this.toggleHoverEnter.bind(this)
        this.toggleHoverLeave = this.toggleHoverLeave.bind(this)
        this.toggleFocus = this.toggleFocus.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    toggleHoverEnter() {
        this.setState({hover: true});
    }

    toggleHoverLeave() {
        this.setState({hover: false});
    }

    onFormSubmit() {
        this.fileUpload(this.state.file);
    }

    handleChange(event) {
        this.setState({filename: event.target.value});
    }

    toggleFocus() {
        this.setState({focus: !this.state.focus})
    }

    onChange(e) {
        if (e.target.files && e.target.files.length > 0 )
            this.setState({file:e.target.files[0], filename: e.target.files[0].name});
    }

    fileUpload(file) {
        const formData = new FormData();
        formData.append('file', file, this.state.filename);
        const headers = {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json'
        };
        fetch(config.API_URL + "/files", {method: "POST", headers, body: formData})
            .then(response => response.json())
            .then(result => {
                this.setState({file: null, filename: ""});
                this.props.onUpload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateFileName(name) {
        this.setState({filename: name})
    }

    render() {
        let uploadClass = "font-first upload-file--file-button--front button"
        let containerClass = "white-color--border upload-file-container"
        if (this.state.file) {
            if (this.state.hover)
                uploadClass += " blue-color--border blue-color"
            else
                uploadClass += " white-color--border white-color"
        } else {
            if (this.state.hover)
                uploadClass += " white-color--border white-color"
            else
                uploadClass += " blue-color--border blue-color"
            containerClass += "__empty"
        }
        let classTextbox = "font-second upload-file--textbox"
        if (this.state.focus)
            classTextbox += "__focus black-color white-color--back"
        else
            classTextbox += " white-color black-color--back blue-color--border"
        return (
            <div className={containerClass}>
                <div className="upload-file--file-button--container"
                    onMouseEnter={this.toggleHoverEnter}
                    onMouseLeave={this.toggleHoverLeave}>
                    <button className={uploadClass}>{this.state.file ? "Select another file": "Select a file"}</button>
                    <input type="file" onChange={this.onChange} className="upload-file--file-button"/>
                </div>
                {this.state.file ? <div className="upload-file--textbox--container">
                        <h3 className="upload-file--textbox--label font-second white-color">filename:</h3>
                        <input
                            onFocus={this.toggleFocus}
                            onBlur={this.toggleFocus}
                            type={this.props.type}
                            value={this.state.filename}
                            onChange={this.handleChange}
                            className={classTextbox}/>
                    </div> : null}
                {this.state.file ? <Button text="Upload" callback={this.onFormSubmit} fontSize="3vh"/> : null}
            </div>
        )
    }
}

export default UploadFile;