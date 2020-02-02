import React from 'react';
import Button from '../../../modules/Button'

class AdminPartnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.logout = this.logout.bind(this)
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    render() {
        return (
            <div className="background black-color--back">
                <Button text="logout" callback={this.logout}/>
            </div>
        );
    }
}

export default AdminPartnership;