import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
// components
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Nav/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Indeed from './pages/Indeed'
//import API from './utils/API';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      id: null,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    //API.getUser(username);
    axios.get('/users/all-users/' + this.state.id).then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          id: response.data.user._id,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          id: null,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {/*this.state.loggedIn &&
          <p>Hello, {this.state.username}!</p>
        */}
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        {/* <Route
          exact path="/profile"
          component={Profile} /> */}
        <Route
          path="/profile"
          render={() =>
            <Profile user={this.state.username} id={this.state.id} />}
        />
        <Route
          exact path="/indeed"
          component={Indeed} />
        <Route
          path="/login"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Register />}
        />
      </div>
    );
  }
}

export default App;
