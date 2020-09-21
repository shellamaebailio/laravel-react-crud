import React, {Component} from 'react'
import {login} from './UserFunctions'
import { Redirect} from 'react-router-dom'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errors: {},
            redirectToReferrer: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault()

        if(localStorage.userToken){
            this.setState(() => ({
                redirectToReferrer: true
              }))
        }

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        // const { redirectToReferrer } = this.state
        // const { from } = this.props.location.state || { from: { pathname: '/' } }
        
        login(user).then(res => {
            if(res) {
                this.props.history.push(`/`)
                window.location.reload(false);
            }
        })

    }

    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign
                            </h1>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" 
                                    className="form-control" 
                                    name="email" 
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" 
                                    className="form-control" 
                                    name="password" 
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login