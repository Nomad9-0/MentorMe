import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./style.css";

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out');
        axios.post('/users/logout').then(response => {
            console.log("inside logout");
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                });
            };
            window.location = "/login";
        }).catch(error => {
            console.log('Logout error: ', error);
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand logo">
                    <h3>Mentor.Me</h3>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse nav justify-content-end" id="navbarNav">

                    {loggedIn ? (
                        <section className="navbar-section">
                            <Link to="/profile" className="btn btn-link text-secondary">
                                <span id="profile" className="text-secondary">Home</span>
                            </Link>
                            <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span id="logout" className="text-secondary">Logout</span>
                            </Link>
                        </section>

                    ) : (

                            <section className="navbar-section">
                                <Link to="/login" className="btn btn-link text-secondary">
                                    <span id="login" className="text-secondary">Login</span>
                                </Link>
                                <Link to="/signup" className="btn btn-link">
                                    <span id="signup" className="text-secondary">Sign Up</span>
                                </Link>

                            </section>
                        )}

                </div>
            </nav>

        );

    }
}

export default Navbar