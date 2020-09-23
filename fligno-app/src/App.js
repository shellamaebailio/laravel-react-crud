import React, { Component } from 'react'
import { Redirect,BrowserRouter as Router, Route } from 'react-router-dom'

// const isLoggedIn = localStorage.usertoken ? true : false

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Patient from './components/Patient'
import ExecutePayment from './components/ExecutePayment'
import CreatePayment from './components/CreatePayment'
import PaypalSettings from './components/PaypalSettings'
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
function PublicRoute ({component: Component, authed, ...rest}) {

  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/Profile'}} />}
    />
  )
}

function AdminRoute ({component: Component, authed, ...rest}) {

  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/'}} />}
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
            {/* <Route exact path="/login" component={Login} /> */}
            {/* <Route exact path="/profile" component={Profile} /> */}
            <PrivateRoute authed={localStorage.usertoken ? true : false} path='/profile' component={Profile} />
            <PrivateRoute authed={localStorage.usertoken ? true : false} path='/patient' component={Patient} />
            <PublicRoute authed={localStorage.usertoken ? false : true} path='/login' component={Login} />
            <Route exact path="/execute-payment" component={ExecutePayment}></Route>
            <Route exact path="/create-payment" component={CreatePayment}></Route>
            {/* <PrivateRoute authed={localStorage.usertoken ? true : false} path='/paypal-settings' component={PaypalSettings} /> */}
            <AdminRoute authed={localStorage.userrole === '1'? true : false} path='/paypal-settings' component={PaypalSettings} />
            
          </div>
        </div>
      </Router>
    )
  }
}

export default App