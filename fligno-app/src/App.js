import React, { Component } from 'react'
import { Redirect,BrowserRouter as Router, Route } from 'react-router-dom'

// const isLoggedIn = localStorage.usertoken ? true : false

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Patient from './components/Patient'
// import PrivateRoute from './components/PrivateRoute'


function PrivateRoute ({component: Component, authed, ...rest}) {

  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}} />}
    />
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/profile" component={Profile} /> */}
            <PrivateRoute authed={localStorage.usertoken ? true : false} path='/profile' component={Profile} />
            <PrivateRoute authed={localStorage.usertoken ? true : false} path='/patient' component={Patient} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App