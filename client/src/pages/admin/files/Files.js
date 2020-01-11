import React from 'react';
import UploadFile from "./UploadFile";
import config from "../../../config";

class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        this.deleteFile = this.deleteFile.bind(this);
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

        this.update = this.update.bind(this);
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
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
            <div>
                <button onClick={this.logout}> Logout </button>
                <br/>
                ADMIN PAGE FILES
                <br/>
                <UploadFile onUpload={this.update}/>
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