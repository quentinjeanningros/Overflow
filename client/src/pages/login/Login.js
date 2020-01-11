import React from 'react';
import config from "../../config";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            username: "",
            password: ""
        };
        this.login = this.login.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(username, event) {
        if (username)
            this.setState({username: event.target.value});
        else
            this.setState({password: event.target.value});
    }

    login(event) {
        event.preventDefault();
        if (this.state.loading)
            return;
        this.setState({loading: true, error: null});
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
        const error = this.state.error ?
            <div>
                {this.state.error}
            </div>
            : null;
        return (
          <div>
              <form onSubmit={this.login}>
                  {error}
                  {this.state.loading ? "IT IS LOADING" : null}
                  <label>
                      Username :
                      <input type="text" value={this.state.username} onChange={(e) => this.updateInput(true, e)} />
                  </label>
                  <label>
                      Password :
                      <input type="password" value={this.state.password} onChange={(e) => this.updateInput(false, e)} />
                  </label>
                  <input type="submit" value="Se connecter" />
              </form>
          </div>
        );
    }
}

export default Login;