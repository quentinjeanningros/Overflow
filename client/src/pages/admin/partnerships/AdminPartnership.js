import React from 'react';

class AdminPartnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    goFiles() {
        window.location.href = '/admin/files';
    }

    render() {
        return (
            <div>
                <button onClick={this.logout}> Logout </button>
                ADMIN PAGE
                <br/>
                <br/>
                <button onClick={this.goFiles}> Files </button>
            </div>
        );
    }
}

export default AdminPartnership;