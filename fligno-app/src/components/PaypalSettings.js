import React, {Component} from 'react'
import {getPaypalSettings, updatePaypalSettings} from './PaymentFunctions'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            client_id: '',
            client_secret: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.getData();
    }

    getData(){
        getPaypalSettings().then(res => {
            
            this.setState({
                client_id: res.data[0].client_id,
                client_secret: res.data[0].client_secret
            })
            
        }).catch(errors => {
            console.log(errors);
        })
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault()

        const setting = {
            client_id: this.state.client_id,
            client_secret: this.state.client_secret
        }
        
        updatePaypalSettings(setting).then(res => {
            console.log(res)
        })

    }

    render(){
        
        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            
                            <div className="form-group">
                                <label htmlFor="clientId">Client ID</label>
                                <textarea className="form-control" 
                                    name="client_id" 
                                    rows="3"
                                    placeholder="Client ID"
                                    value={this.state.client_id}
                                    onChange={this.onChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="clientSecret">Client Secret</label>
                                <textarea className="form-control" 
                                    name="client_secret" 
                                    rows="3"
                                    placeholder="Client Secret"
                                    value={this.state.client_secret}
                                    onChange={this.onChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login