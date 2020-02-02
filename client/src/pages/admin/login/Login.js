import React from 'react';
import config from "../../../config";
import TextBox from "../../../modules/TextBox.js";
import './Login.css';
import {NavigationBar, Link}  from '../../../modules/NavigationBar.js';
import LoadingAnimation from '../../../modules/LoadingAnimation.js';
import Button from '../../../modules/Button';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            username: "",
            password: "",
            loop: false
        };
        this.linkedPages = [new Link("Home", "/home"), new Link("Events", "events"), new Link("Partnership", "/partnership")];
        this.login = this.login.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    async setUsername(text) {
        await this.setState({username: text})
    }

    async setPassword(text) {
        await this.setState({password: text})
    }

    login() {
        if (this.state.username === "" || this.state.password === "")
            return;
        if (this.state.loading)
            return;
        this.setState({loading: true, error: null});
        this.setState({loop: true});
        const body = {
            username: this.state.username,
            password: this.state.password
        };
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        fetch(config.API_URL + "/login", {method: "POST", headers, body: JSON.stringify(body)})
            .then(response => response.json())
            .then(result => {
                if (result.hasOwnProperty("error")) {
                    this.setState({loading: false, error: result.error});
                } else {
                    this.setState({loading: false, error: null});
                    localStorage.setItem('token', result.token);
                    window.location.href = '/admin';
                }
            })
            .catch(e => {
                this.setState({loading: false, error: e});
            });
    }

    render() {
        let lock = false
        if (this.state.username === "" || this.state.password === "")
            lock = true
        const error =
            <h2 className="orange-color font-first login-error">
                {this.state.error  ? this.state.error.toUpperCase() : null}
                </h2>;
        const callback = () => {
            if (this.state.loading === false) {
                    this.setState({loop: false});
                    this.setState({hover: !this.state.hover});
            }
        }
        return (
            <div className="background black-color--back">
                <NavigationBar color="white-color" triggerColor="blue-color" links={this.linkedPages}/>
                <form className="login--form--container" onSubmit={this.login}>
                    {error}
                    <TextBox class="" label="Username" type="text" callback={this.setUsername}/>
                    <TextBox class="" label="Password" type="password" callback={this.setPassword}/>
                    {this.state.loop ?
                        <div className="login-load-animation">
                            <LoadingAnimation height={100} width={100} callback={callback}/>
                        </div>
                        :
                        <Button text="Login" callback={this.login} class="login-button" lock={lock}/>
                    }
                </form>
            </div>
        );
    }
}

export default Login;