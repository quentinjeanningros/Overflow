import React from 'react';
import './UploadFile.css'
import config from "../../../config";
import Button from '../../../modules/Button';
import TextBox from "../../../modules/TextBox.js";

class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null,
            filename: "",
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.updateFileName = this.updateFileName.bind(this)
    }

    onFormSubmit(e){
        e.preventDefault();
        this.fileUpload(this.state.file);
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
                console.log(result);
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
        if (this.state.file)
            uploadClass += " white-color--border white-color"
        else
            uploadClass += " blue-color--border blue-color"
        return (
            <div className="upload-file-container white-color--border">
                <div className="upload-file--file-button--container">
                    <button className={uploadClass}>{this.state.file ? "Select another file": "Select a file"}</button>
                    <input type="file" onChange={this.onChange} className="upload-file--file-button"/>
                </div>
                <h1 className="white-color font-second">{this.state.filename}</h1>
                <Button lock={this.state.file ? false : true} text="Upload" callback={this.onFormSubmit} class="upload-file--upload-button" fontSize="3vh"/>
            </div>
        )
    }
}

export default UploadFile;