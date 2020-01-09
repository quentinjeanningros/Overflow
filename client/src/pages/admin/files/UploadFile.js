import React from 'react';
import './UploadFile.css'
import config from "../../../config";

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

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="form-upload">
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <input type="text" value={this.state.filename} onChange={(e) => this.setState({filename: e.target.value})} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default UploadFile;